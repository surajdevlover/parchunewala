const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// List of files to check and update
const filesToUpdate = [
  'app/delivery-partner/page.tsx',
  'app/terms-of-service/page.tsx',
  'app/store/page.tsx',
  'app/store/all/page.tsx',
  'app/security/page.tsx',
  'app/product/all/page.tsx',
  'app/privacy-policy/page.tsx',
  'app/press/page.tsx',
  'app/partner-with-us/page.tsx',
  'app/faqs/page.tsx',
  'app/franchise/page.tsx',
  'app/careers/page.tsx',
  'app/cookie-policy/page.tsx',
  'app/careers/apply/page.tsx',
  'app/contact/page.tsx',
  'app/cart/page.tsx',
  'app/become-seller/page.tsx',
  'app/blog/page.tsx'
];

console.log(`Starting update of SharedHeader imports in ${filesToUpdate.length} files...`);

filesToUpdate.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      // Check if the file contains the default import
      if (content.includes('import SharedHeader from "@/components/shared-header"')) {
        // Replace default import with named import
        content = content.replace(
          'import SharedHeader from "@/components/shared-header"', 
          'import { SharedHeader } from "@/components/shared-header"'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated imports in: ${file}`);
      } else {
        console.log(`No update needed for: ${file}`);
      }
    } else {
      console.log(`File not found: ${file}`);
    }
  } catch (error) {
    console.error(`Error updating ${file}:`, error);
  }
});

console.log('Import updates completed!'); 