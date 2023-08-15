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


namespace CLI.Services
{
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

    public class Cutter
    {
        // Data about image
        public List<Point> points;
        public Color background;
        public Bitmap img;

        public ReplyData CutterFunc(RequestData data) // вызывать эту функцию в CutterController
        {
            Bitmap im = data.Bitmap;
            Cutter dat = Operate(im);     // this func does everything
            im = dat.img;
            //im.Save("C:\\Users\\1392680\\source\\repos\\Cutter\\res3.png", System.Drawing.Imaging.ImageFormat.Png);

            ReplyData replydata = new()
            {
                Id = data.Id,
                Bitmap = im
            };

            return replydata;
        }

        private static Cutter Operate(Bitmap im)
        {
            Cutter data = Getcoordinates(im);
            Color back = data.background;
            List<Point> coords = data.points;
            if (coords[0].X != -1)
                im = crop(im, coords);
            im = Convert512(im, back, data.points[0]);
            data.img = im;
            return data;

        }

        private static Bitmap Convert512(Bitmap img, Color c, Point p)
        {
            double scale;
            // if back
            if (p.Y < 0)
            {
                double k = Math.Sqrt(512.0 * 512.0 / (img.Width * img.Height));
                int nh = Convert.ToInt32(Math.Floor(img.Height * k));
                int nw = Convert.ToInt32(Math.Floor(img.Width * k));
                img = ResizeImage(img, nw, nh);
                return img;
            }
            // no back
            if (img.Height > img.Width)
            {
                scale = 492.0 / img.Height;
            }
            else
            {
                scale = 492.0 / img.Width;
            }
            int h, w;
            h = Convert.ToInt32(Math.Floor(img.Height * scale));
            w = Convert.ToInt32(Math.Floor(img.Width * scale));
            img = ResizeImage(img, w, h);

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
            for (int i = 0; i < img.Width; i++)
                for (int j = 0; j < img.Height; j++)
                {
                    Color col = img.GetPixel(i, j);
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

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            return destImage;
        }

        private static Bitmap Open(string path)
        {
            Bitmap res = (Bitmap)Image.FromFile(path);
            return res;
        }

        private static Cutter Getcoordinates(Bitmap img)
        {
            Cutter result = new();
            List<Point> res = new List<Point>();
            int ifnoborder = 0;
            Color background = img.GetPixel(0, 0);
            for (int i = 0; i < img.Width; i++)
            {
                if (img.GetPixel(i, img.Height - 1) != background)
                    ifnoborder++;
                if (img.GetPixel(i, 0) != background)
                    ifnoborder++;
            }
            for (int i = 0; i < img.Height; i++)
            {
                if (img.GetPixel(img.Width - 1, i) != background)
                    ifnoborder++;
                if (img.GetPixel(0, i) != background)
                    ifnoborder++;
            }
            if (ifnoborder > 0)
            {
                res.Add(new Point(-1, -1));
                result.points = res;
                return result;
            }
            /* =============Search verticals================*/
            // Left border
            int lx = 0;
            bool cont = true; // continue to scan
            while (cont)
            {
                for (int i = 1; i < img.Height; i++)
                    if (img.GetPixel(lx, i) != background)
                    {
                        cont = false;
                        i = img.Height;
                    }
                lx++;
                // stop when border, monocolour
                if (lx == img.Width - 1)
                {
                    res.Add(new Point(-1, -3));
                    result.points = res;
                    return result;
                }
            }
            cont = true;
            // Right border
            int rx = img.Width - 1;
            while (cont)
            {
                for (int i = 0; i < img.Height; i++)
                    if (img.GetPixel(rx, i) != background)
                    {
                        cont = false;
                        i = img.Height;
                    }
                rx--;
            }

            // Top
            cont = true;
            int ty = 0;
            while (cont)
            {
                for (int i = lx; i < rx; i++)
                    if (img.GetPixel(i, ty) != background)
                    {
                        cont = false;
                        i = rx;
                    }
                ty++;
            }
            // Bottom
            cont = true;
            int by = img.Height - 1;
            while (cont)
            {
                for (int i = lx; i < rx; i++)
                    if (img.GetPixel(i, by) != background)
                    {
                        cont = false;
                        i = rx;
                    }
                by--;
            }
            // no loosings
            if (lx - 5 >= 0) lx -= 5;
            else lx = 0;
            if (rx + 5 < img.Width) rx += 5;
            else rx = img.Width - 1;
            if (ty - 5 >= 0) ty -= 5;
            else ty = 0;
            if (by + 5 < img.Height) by += 5;
            else by = img.Height - 1;
            res.Add(new Point(lx, by));
            res.Add(new Point(lx, ty));
            res.Add(new Point(rx, ty));
            res.Add(new Point(rx, by));
            result.points = res;
            result.background = background;
            return result;
        }

        private static Bitmap crop(Bitmap img, List<Point> coords)
        {
            int w = coords[2].X - coords[1].X;
            int h = coords[0].Y - coords[1].Y;
            Rectangle rect = new Rectangle(coords[1].X, coords[1].Y, w, h);
            Bitmap cropped = img.Clone(rect, PixelFormat.Format16bppRgb555);
            return cropped;
        }
    }    
}
