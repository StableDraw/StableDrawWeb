using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Security.Cryptography.X509Certificates;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using CLI.Controllers;
using CLI.Models;
using Newtonsoft.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace CLI.Services
{
    //------------------------------
    public class RequestData
    {
        public long Id { get; set; }
        public Bitmap Bitmap { get; set; }
    }

    public class ReplyData
    {
        public long Id { get; set; }
        public Bitmap Bitmap { get; set; }
    }

    public interface ICutterService
    {
        public List<Point> Points { get; set; }
        public Color Background { get; set; }
        public Bitmap Img { get; set; }
        public Task<ReplyData> CutterAsync(RequestData data); // async method
    }
    //------------------------------

    public class CutterService: ICutterService
    {
        // Data about image
        public List<Point> Points { get; set; }
        public Color Background { get; set; }
        public Bitmap Img { get; set; }

        private ICutterService cutterService;
        public CutterService(ICutterService cutterService) // constructor
        {
            this.cutterService = cutterService;
        }

        public CutterService(){ }


        public async Task<ReplyData> CutterAsync(RequestData data) // async method
        {
            //Bitmap im = Open("test12.png");
            Bitmap im = data.Bitmap;

            await Task<ReplyData>.Run(() =>
            {
                cutterService = Operate(im);     // this func does everything
                im = cutterService.Img;
                //im.Save("C:\\Users\\1392680\\source\\repos\\Cutter\\res3.png", System.Drawing.Imaging.ImageFormat.Png);
            });

            ReplyData replydata = new()
            {
                Id = data.Id,
                Bitmap = im
            };

            return replydata;
        }

        //------------------------------ functions for working with photo cropping
        private static CutterService Operate(Bitmap im)
        {
            CutterService data = Getcoordinates(im);
            Color back = data.Background;
            List<Point> coords = data.Points;
            if (coords[0].X != -1)
                im = Crop(im, coords);
            im = Convert512(im, back, data.Points[0]);
            data.Img = im;
            return data;

        }
        
        private static Bitmap Convert512(Bitmap Img, Color c, Point p)
        {
            double scale;
            // if back
            if (p.Y < 0)
            {
                double k = Math.Sqrt(512.0 * 512.0 / (Img.Width * Img.Height));
                int nh = Convert.ToInt32(Math.Floor(Img.Height * k));
                int nw = Convert.ToInt32(Math.Floor(Img.Width * k));
                Img = ResizeImage(Img, nw, nh);
                return Img;
            }
            // no back
            if (Img.Height > Img.Width)
            {
                scale = 492.0 / Img.Height;
            }
            else
            {
                scale = 492.0 / Img.Width;
            }
            int h, w;
            h = Convert.ToInt32(Math.Floor(Img.Height * scale));
            w = Convert.ToInt32(Math.Floor(Img.Width * scale));
            Img = ResizeImage(Img, w, h);

            Bitmap res = new(512, 512, PixelFormat.Format16bppRgb555);

            // border sizes
            int sorb = (512 - w) / 2;
            int vorb = (512 - h) / 2;
            /* ============Frame=============*/

            // Top 
            for (int i = 0; i < 512; i++)
                for (int j = 0; j <= vorb; j++)
                {
                    res.SetPixel(i, j, c);
                }
            // Bottom
            for (int i = 0; i < 512; i++)
                for (int j = 512 - vorb - 1; j < 512; j++)
                {
                    res.SetPixel(i, j, c);
                }
            // Left
            for (int i = 0; i < sorb; i++)
                for (int j = vorb; j <= 512 - vorb; j++)
                {
                    res.SetPixel(i, j, c);
                }
            // Right
            for (int i = 512 - sorb - 1; i < 512; i++)
                for (int j = vorb; j <= 512 - vorb; j++)
                {
                    res.SetPixel(i, j, c);
                }

            // Insert the image
            for (int i = 0; i < Img.Width; i++)
                for (int j = 0; j < Img.Height; j++)
                {
                    Color col = Img.GetPixel(i, j);
                    res.SetPixel(i + sorb, j + vorb, col);
                }
            return res;
        }

        public static Bitmap ResizeImage(Image image, int width, int height)
        {
            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);

            destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using var wrapMode = new ImageAttributes();
                wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
            }

            return destImage;
        }
        

        private static Bitmap Open(string path)
        {
            Bitmap res = (Bitmap)Image.FromFile(path);
            return res;
        }

        private static CutterService Getcoordinates(Bitmap Img)
        {
            CutterService result = new CutterService();
            List<Point> res = new List<Point>();
            int ifnoborder = 0;
            Color Background = Img.GetPixel(0, 0);
            for (int i = 0; i < Img.Width; i++)
            {
                if (Img.GetPixel(i, Img.Height - 1) != Background)
                    ifnoborder++;
                if (Img.GetPixel(i, 0) != Background)
                    ifnoborder++;
            }
            for (int i = 0; i < Img.Height; i++)
            {
                if (Img.GetPixel(Img.Width - 1, i) != Background)
                    ifnoborder++;
                if (Img.GetPixel(0, i) != Background)
                    ifnoborder++;
            }
            if (ifnoborder > 0)
            {
                res.Add(new Point(-1, -1));
                result.Points = res;
                return result;
            }
            /* =============Search verticals================*/
            // Left border
            int lx = 0;
            bool cont = true; // continue to scan
            while (cont)
            {
                for (int i = 1; i < Img.Height; i++)
                    if (Img.GetPixel(lx, i) != Background)
                    {
                        cont = false;
                        i = Img.Height;
                    }
                lx++;
                // stop when border, monocolour
                if (lx == Img.Width - 1)
                {
                    res.Add(new Point(-1, -3));
                    result.Points = res;
                    return result;
                }
            }
            cont = true;
            // Right border
            int rx = Img.Width - 1;
            while (cont)
            {
                for (int i = 0; i < Img.Height; i++)
                    if (Img.GetPixel(rx, i) != Background)
                    {
                        cont = false;
                        i = Img.Height;
                    }
                rx--;
            }

            // Top
            cont = true;
            int ty = 0;
            while (cont)
            {
                for (int i = lx; i < rx; i++)
                    if (Img.GetPixel(i, ty) != Background)
                    {
                        cont = false;
                        i = rx;
                    }
                ty++;
            }
            // Bottom
            cont = true;
            int by = Img.Height - 1;
            while (cont)
            {
                for (int i = lx; i < rx; i++)
                    if (Img.GetPixel(i, by) != Background)
                    {
                        cont = false;
                        i = rx;
                    }
                by--;
            }
            // no loosings
            if (lx - 5 >= 0) lx -= 5;
            else lx = 0;
            if (rx + 5 < Img.Width) rx += 5;
            else rx = Img.Width - 1;
            if (ty - 5 >= 0) ty -= 5;
            else ty = 0;
            if (by + 5 < Img.Height) by += 5;
            else by = Img.Height - 1;
            res.Add(new Point(lx, by));
            res.Add(new Point(lx, ty));
            res.Add(new Point(rx, ty));
            res.Add(new Point(rx, by));
            result.Points = res;
            result.Background = Background;
            return result;
        }

        private static Bitmap Crop(Bitmap Img, List<Point> coords)
        {
            int w = coords[2].X - coords[1].X;
            int h = coords[0].Y - coords[1].Y;
            Rectangle rect = new Rectangle(coords[1].X, coords[1].Y, w, h);
            Bitmap cropped = Img.Clone(rect, PixelFormat.Format16bppRgb555);
            return cropped;
        }
    }    
}
