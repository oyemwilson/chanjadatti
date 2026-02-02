import ImpactReport from "../models/ImpactReport.js";
import cloudinary from "../config/cloudinary.js";

// Get all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await ImpactReport.find({}).sort({ year: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload new report with auto-generated preview
export const uploadReport = async (req, res) => {
  try {
    const { year } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    console.log("Uploading PDF for year:", year);

    const timestamp = Date.now();

    // Upload 1: PDF as RAW for actual download/view link
    const pdfRawUpload = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "impact-reports/pdfs",
          resource_type: "raw",
          public_id: `report-${year}-${timestamp}`,
          type: "upload",
        },
        (error, result) => {
          if (error) {
            console.error("Raw PDF upload error:", error);
            reject(error);
          } else {
            console.log("Raw PDF uploaded:", result.secure_url);
            resolve(result);
          }
        }
      );
      uploadStream.end(req.file.buffer);
    });

    // Upload 2: PDF as IMAGE for preview generation
    const pdfImageUpload = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "impact-reports/previews",
          resource_type: "image",
          format: "pdf",
          public_id: `preview-${year}-${timestamp}`,
        },
        (error, result) => {
          if (error) {
            console.error("Image PDF upload error:", error);
            reject(error);
          } else {
            console.log("Preview PDF uploaded:", result.secure_url);
            resolve(result);
          }
        }
      );
      uploadStream.end(req.file.buffer);
    });

    // Generate preview image URL with better cropping (fit instead of fill)
    const coverImageUrl = cloudinary.url(pdfImageUpload.public_id, {
      resource_type: "image",
      format: "jpg",
      page: 1,
      transformation: [
        { 
          width: 800, 
          height: 1200, 
          crop: "fit", // Changed from "fill" to "fit" to show full page
          quality: "auto",
          background: "white" // Add white background for any padding
        },
      ],
    });

    // Create a URL with fl_attachment flag to force download when needed
    // But for viewing in browser, we'll use the regular URL
    const pdfViewUrl = pdfRawUpload.secure_url;

    console.log("PDF URL (viewable):", pdfViewUrl);
    console.log("Cover image URL:", coverImageUrl);

    const report = await ImpactReport.create({
      year,
      pdfUrl: pdfViewUrl,
      coverImage: coverImageUrl,
    });

    res.status(201).json(report);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete report
// Delete report from both database and Cloudinary
export const deleteReport = async (req, res) => {
  try {
    const report = await ImpactReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Extract and delete raw PDF from Cloudinary
    const pdfUrlParts = report.pdfUrl.split("/");
    const pdfFile = pdfUrlParts[pdfUrlParts.length - 1];
    const pdfPublicId = `impact-reports/pdfs/${pdfFile.replace('.pdf', '')}`;
    
    console.log("Deleting PDF with public_id:", pdfPublicId);
    
    try {
      await cloudinary.uploader.destroy(pdfPublicId, { 
        resource_type: "raw",
        invalidate: true 
      });
      console.log("PDF deleted from Cloudinary");
    } catch (cloudinaryError) {
      console.error("Failed to delete PDF from Cloudinary:", cloudinaryError);
    }

    // Extract and delete preview image from Cloudinary
    const coverUrlParts = report.coverImage.split("/");
    const uploadIndex = coverUrlParts.findIndex(part => part === "upload");
    
    if (uploadIndex !== -1) {
      // Get everything after version number (e.g., v1234567890)
      const pathAfterVersion = coverUrlParts.slice(uploadIndex + 2);
      
      // Remove transformation parameters and get clean path
      const cleanPath = pathAfterVersion
        .filter(part => !part.startsWith('w_') && !part.startsWith('h_') && 
                       !part.startsWith('c_') && !part.startsWith('q_') && 
                       !part.startsWith('pg_') && !part.startsWith('b_'))
        .join('/');
      
      // Remove file extension
      const previewPublicId = cleanPath.replace('.jpg', '');
      
      console.log("Deleting preview with public_id:", previewPublicId);
      
      try {
        await cloudinary.uploader.destroy(previewPublicId, { 
          resource_type: "image",
          invalidate: true 
        });
        console.log("Preview deleted from Cloudinary");
      } catch (cloudinaryError) {
        console.error("Failed to delete preview from Cloudinary:", cloudinaryError);
      }
    }

    // Delete from database
    await ImpactReport.findByIdAndDelete(req.params.id);

    res.json({ message: "Report deleted successfully from database and Cloudinary" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
};

// In your impactReportController.js - ADD THIS NEW FUNCTION

export const viewPdf = async (req, res) => {
  try {
    const report = await ImpactReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Fetch PDF from Cloudinary
    const response = await fetch(report.pdfUrl);
    
    if (!response.ok) {
      throw new Error("Failed to fetch PDF from Cloudinary");
    }

    const pdfBuffer = await response.arrayBuffer();

    // Set headers to display PDF in browser
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    console.error("PDF view error:", err);
    res.status(500).json({ message: "Failed to load PDF" });
  }
};