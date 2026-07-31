# Derm Glow Journal | Clinical Skincare Affiliate Website

This website is a product review portal. It promotes SellHealth skincare products.
The products are Kollagen Intensiv and Illuminatural 6i.

---

## 🌟 Key Features

* **Product Reviews**: Unbiased analysis and clinical data for Kollagen Intensiv and Illuminatural 6i.
* **Product Matchup**: Side-by-side comparison table showing active ingredients and prices.
* **Skin Assessment Quiz**: Three-question interactive quiz that recommends a product.
* **SEO Optimized**: Valid JSON-LD Schema markup and meta tags for search engines.
* **Responsive Layout**: Designed for mobile phones, tablets, and desktop computers.
* **Link Hardening**: Outgoing affiliate links use security attributes to block security exploits.

---

## 📁 File Structure

```
C:\Users\A2\Sellhealth Project\
├── index.html                    # Main landing page
├── links.html                    # Link-in-bio page for social media
├── kollagen-intensiv-review.html # Kollagen Intensiv review article
├── illuminatural-6i-review.html  # Illuminatural 6i review article
├── styles.css                    # Design system tokens and layout styles
├── app.js                        # Quiz and link management script
├── social_media_assets.md        # Social media post templates
├── README.md                     # This documentation file
├── gemini.md                     # Local project memory file (ignored by git)
├── .gitignore                    # Prevents local files from uploading
└── Pictures/                     # Product image files
    ├── KollagenIntensiv.jpg
    ├── KollagenIntensiv1.jpg
    ├── illuminatural.jpg
    └── illuminatural2.jpg
```

---

## 🚀 How to Publish to GitHub Pages

You must upload the files to your GitHub account. Follow these steps:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub.com](https://github.com).
2. Click **New Repository**.
3. Type `sellhealth-skincare` in the repository name field.
4. Select the **Public** option.
5. Click **Create repository**.

### Step 2: Upload Your Code with Git
1. Open your terminal software.
2. Change the directory to `C:\Users\A2\Sellhealth Project`.
3. Run the following commands:
   ```bash
   git init
   git add .
   git commit -m "Add project files"
   git branch -M main
   git remote add origin https://github.com/skin-health/sellhealth-skincare.git
   git push -u origin main
   ```

### Step 3: Enable the Live Website
1. Open your repository page on GitHub.
2. Click the **Settings** tab.
3. Click **Pages** in the left navigation panel.
4. Go to **Build and deployment**.
5. Select **Deploy from a branch** in the source list.
6. Select **main** branch and **/(root)** folder.
7. Click **Save**.

The website will be live in 60 seconds at `https://skin-health.github.io/sellhealth-skincare/`.

---

## ⚙️ How to Update the Affiliate ID

The website tracks commissions using a SellHealth ID.
Follow these steps to change this ID:

1. Open the [app.js](file:///C:/Users/A2/Sellhealth%20Project/app.js) file.
2. Find the `DEFAULT_LINKS` object on line 18.
3. Replace the default ID in the URLs with your SellHealth ID.
4. Save the file.
5. Upload the modified file to your GitHub repository.
