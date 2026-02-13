# My Kawaii Personal Homepage 🌸

A personal website powered by Google Sheets!

## 🚀 Quick Setup

### 1. Create your Google Sheet
1. Create a new Google Sheet.
2. **Tab Names (Worksheets)**: Each tab name will become a category in your website's sidebar.
3. In each tab, add these headers in the first row (Row 1):
   - `Title` (Required) - Name of the item
   - `URL` (Required) - Link to the resource
   - `Description` - Short description
   - `ImageURL` - Link to an image (optional)
   - `Tags` - Comma separated tags e.g., "Free, New"

4. Fill in your data!

### 2. Publish to Web
1. In your Google Sheet, go to **File** > **Share** > **Publish to web**.
2. Click **Publish**. (You don't need to change the format, just ensure the whole document is published).
3. Copy your **Spreadsheet ID** from the URL bar of your sheet.
   - It looks like this: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

### 3. Connect to Website
1. Open `src/data/config.js` in this project.
2. Paste your **Spreadsheet ID** into `SPREADSHEET_ID`.

### 4. Deploy to GitHub
1. Upload this code to a new GitHub repository.
2. Go to **Settings** > **Pages**.
3. Under "Build and deployment", select **GitHub Actions**.
4. The deployment will start automatically!

## 🎨 Customize
- **Colors**: Edit `src/index.css` to change the theme.
- **Title**: Edit `src/App.jsx` to change the site title.
- **Repository Name**: If your site layout looks broken, update `base: '/REPO_NAME/'` in `vite.config.js` to match your repository name.

Enjoy your new site! ✨
