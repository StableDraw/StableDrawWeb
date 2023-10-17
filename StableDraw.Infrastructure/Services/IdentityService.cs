using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using StableDraw.Application.Common.Exceptions;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Infrastructure.Identity;
using ValidationException = System.ComponentModel.DataAnnotations.ValidationException;

namespace StableDraw.Infrastructure.Services;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IEmailSender _emailSender;
    private readonly IUrlHelperFactory _urlHelperFactory;
    private readonly IActionContextAccessor _actionContextAccessor;

        public IdentityService(UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager, 
            RoleManager<IdentityRole> roleManager, IEmailSender emailSender, IActionContextAccessor actionContextAccessor, IUrlHelperFactory urlHelperFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _emailSender = emailSender;
            _actionContextAccessor = actionContextAccessor;
            _urlHelperFactory = urlHelperFactory;
        }

        #region User section

        public async Task<bool> ForgotUserPassword(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
            {
                throw new ValidationException("Email not confirmed");
            }
            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(code);
            var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
            var urlHelper = _urlHelperFactory.GetUrlHelper(_actionContextAccessor.ActionContext);
            var scheme = urlHelper.ActionContext.HttpContext.Request.Scheme;
            var callbackUrl = urlHelper.RouteUrl(new UrlRouteContext()
            {
                RouteName = "ResetPassword",
                Values = new { email = user.Email, code = codeEncoded },
                Protocol = scheme
            });
            
            await _emailSender.SendEmailAsync(user.Email, "Confirm your account",
                $"Подтвердите регистрацию, перейдя по ссылке: <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>link</a>");
            
            return true;
        }

        public async Task<bool> ResetUserPassword(string email, string password, string code)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            var result = await _userManager.ResetPasswordAsync(user, code, password);

            if (!result.Succeeded)
            {
                throw new ValidationException(result.Errors.ToString());
            }

            return result.Succeeded;
        }

        public async Task<bool> RegistrationUserAsync(string userName, string password, string email, string fullName)
        {
            var user = new ApplicationUser()
            {
                FullName = fullName,
                UserName = userName,
                Email = email
            };

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                var delUserResult = await DeleteUserAsync(user.Id);
                throw new ValidationException(result.Errors.ToString());
            }

            var defaultRole = await _roleManager.FindByNameAsync("Default");
            if (defaultRole == null)
            {
                defaultRole = new IdentityRole("Default"); 
                await _roleManager.CreateAsync(defaultRole);
            }
            
            var addUserRole = await _userManager.AddToRoleAsync(user, defaultRole.Name);
            if (!addUserRole.Succeeded)
            {
                throw new ValidationException(addUserRole.Errors.ToString());
            }
            
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(code);
            var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
            var urlHelper = _urlHelperFactory.GetUrlHelper(_actionContextAccessor.ActionContext);
            var scheme = urlHelper.ActionContext.HttpContext.Request.Scheme;
            var callbackUrl = urlHelper.Action( new UrlActionContext()
            {
                Action = "ConfirmEmail",
                Controller = "Auth",
                Values = new { userId = user.Id, code = codeEncoded },
                Protocol = scheme,
                //Host = urlHelper.ActionContext.HttpContext.Request.Host.Host
            });
            
            await _emailSender.SendEmailAsync(user.Email, "Confirm your account",
                $"Подтвердите регистрацию, перейдя по ссылке: <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>link</a>");
            
            return result.Succeeded;
        }

        // Return multiple value
        public async Task<(bool isSucceed, string userId)> CreateUserAsync(string userName, string password, string email, string fullName, List<string> roles)
        {
            var user = new ApplicationUser()
            {
                FullName = fullName,
                UserName = userName,
                Email = email
            };

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                var delUserResult = await DeleteUserAsync(user.Id);
                throw new ValidationException(result.Errors.ToString());
            }

            var addUserRole = await _userManager.AddToRolesAsync(user, roles);
            if (!addUserRole.Succeeded)
            {
                throw new ValidationException(addUserRole.Errors.ToString());
            }
            
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(code);
            var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
            var urlHelper = _urlHelperFactory.GetUrlHelper(_actionContextAccessor.ActionContext);
            var scheme = urlHelper.ActionContext.HttpContext.Request.Scheme;
            var callbackUrl = urlHelper.Action( new UrlActionContext()
            {
                Action = "ConfirmEmail",
                Controller = "Auth",
                Values = new { userId = user.Id, code = codeEncoded },
                Protocol = scheme,
                //Host = urlHelper.ActionContext.HttpContext.Request.Host.Host
            });
            
            await _emailSender.SendEmailAsync(user.Email, "Confirm your account",
                $"Подтвердите регистрацию, перейдя по ссылке: <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>link</a>");
            
            return (result.Succeeded, user.Id);
        }

        public async Task<bool> EmailConfirmed(string userId, string code)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (!result.Succeeded)
            {
                throw new ValidationException(result.Errors.ToString());
            }

            await _signInManager.SignInAsync(user, false);
            return result.Succeeded;
        }

        public async Task<bool> DeleteUserAsync(string userId)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            if (user.UserName == "system" || user.UserName == "admin")
            {
                throw new BadRequestException("You can not delete system or admin user");
                //throw new BadRequestException("You can not delete system or admin user");
            }
            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }

        public async Task<List<(string id, string fullName, string userName, string email)>> GetAllUsersAsync()
        {
            var users = await _userManager.Users.Select(x => new
            {
                x.Id,
                x.FullName,
                x.UserName,
                x.Email
            }).ToListAsync();

            return users.Select(user => (user.Id, user.FullName, user.UserName, user.Email)).ToList();
        }

        public Task<List<(string id, string userName, string email, IList<string> roles)>> GetAllUsersDetailsAsync()
        {
            throw new NotImplementedException();

            //var roles = await _userManager.GetRolesAsync(user);
            //return (user.Id, user.UserName, user.Email, roles);

            //var users = _userManager.Users.ToListAsync();
        }
        

        public async Task<(string userId, string fullName, string UserName, string email, IList<string> roles)> GetUserDetailsAsync(string userId)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");             
            }
            var roles = await _userManager.GetRolesAsync(user);
            return (user.Id, user.FullName, user.UserName, user.Email, roles);
        }

        public async Task<(string userId, string fullName, string UserName, string email, IList<string> roles)> GetUserDetailsByUserNameAsync(string userName)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            var roles = await _userManager.GetRolesAsync(user);
            return (user.Id, user.FullName, user.UserName, user.Email, roles);
        }

        public async Task<string> GetUserIdAsync(string userName)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            return await _userManager.GetUserIdAsync(user);
        }

        public async Task<string> GetUserNameAsync(string userId)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            return await _userManager.GetUserNameAsync(user);
        }

        public async Task<bool> IsUniqueUserName(string userName)
        {
            return await _userManager.FindByNameAsync(userName) == null;
        }

        public async Task<bool> SigninUserAsync(string userName, string password)
        {
            var result = await _signInManager.PasswordSignInAsync(userName, password, true, false);
            return result.Succeeded;
        }

        public async Task<bool> UpdateUserProfile(string id, string fullName, string email, IList<string> roles)
        {
            var user = await _userManager.FindByIdAsync(id);
            user.FullName = fullName;
            user.Email = email;
            var result = await _userManager.UpdateAsync(user);

            return result.Succeeded;
        }

        #endregion
        
        #region Role Section

        public async Task<List<(string id, string roleName)>> GetRolesAsync()
        {
            var roles = await _roleManager.Roles.Select(x => new
            {
                x.Id,
                x.Name
            }).ToListAsync();

            return roles.Select(role => (role.Id, role.Name)).ToList();
        }
        
        public async Task<bool> CreateRoleAsync(string roleName)
        {
            var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
            if(!result.Succeeded)
            {
                throw new ValidationException(result.Errors.ToString());
            }
            return result.Succeeded;
        }
        
        public async Task<bool> DeleteRoleAsync(string roleId)
        {
            var roleDetails = await _roleManager.FindByIdAsync(roleId);
            if (roleDetails == null)
            {
                throw new NotFoundException("Role not found");
            }

            if (roleDetails.Name == "Administrator")
            {
                throw new BadRequestException("You can not delete Administrator Role");
            }
            var result = await _roleManager.DeleteAsync(roleDetails);
            if (!result.Succeeded)
            {
                throw new ValidationException(result.Errors.ToString());
            }
            return result.Succeeded;
        }
        
        public async Task<bool> UpdateRole(string id, string roleName)
        {
            if (roleName != null)
            {
                var role = await _roleManager.FindByIdAsync(id);
                role.Name = roleName;
                var result = await _roleManager.UpdateAsync(role);
                return result.Succeeded;
            }
            return false;
        }

        public async Task<(string id, string roleName)> GetRoleByIdAsync(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            return (role.Id, role.Name);
        }
        
        #endregion
        
        #region User's Role section
        
        public async Task<bool> AssignUserToRole(string userName, IList<string> roles)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            var result = await _userManager.AddToRolesAsync(user, roles);
            return result.Succeeded;
        }
        
        public async Task<List<string>> GetUserRolesAsync(string userId)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            var roles = await _userManager.GetRolesAsync(user);
            return roles.ToList();
        }
        
        public async Task<bool> IsInRoleAsync(string userId, string role)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if(user == null)
            {
                throw new NotFoundException("User not found");
            }
            return await _userManager.IsInRoleAsync(user, role);
        }
        
        public async Task<bool> UpdateUsersRole(string userName, IList<string> usersRole)
        {
            var user =  await _userManager.FindByNameAsync(userName);
            var existingRoles = await _userManager.GetRolesAsync(user);
            var result = await _userManager.RemoveFromRolesAsync(user, existingRoles);
            result = await _userManager.AddToRolesAsync(user, usersRole);

            return result.Succeeded;
        }
        
        #endregion
}