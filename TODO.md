# TODO: Update About Section — Funding Grants & Trusted By Logos

## Approved Plan
Update `artifacts/big-bucks-innovation/src/routes/about.tsx` with the following:

### Step 1: Update `grantLogos` array
- Ensure all 8 organizations are listed with exact names:
  1. IIT Delhi IHFC
  2. EDII TN, Government of Tamil Nadu
  3. Maharashtra Pollution Control Board
  4. Anna Incubator
  5. NIT Srinagar
  6. GITAM University Vizag
  7. Veltech University
  8. Chennai Institute of Technology

### Step 2: Update `partners` array (Trusted By Government & Industry)
- Replace with exact 9 organizations:
  1. IIT Delhi
  2. Ministry of Corporate Affairs
  3. DPIIT
  4. AICTE
  5. Ministry of MSME
  6. Ministry of Commerce Affairs
  7. StartupTN
  8. Startup India
  9. EDII TN

### Step 3: Add marquee (logo roll) to Trusted By section
- Add a second marquee strip for `partners` logos in the "Trusted by Government & Industry" section, similar to the existing Funding Grants marquee.

### Step 4: Update Trusted By cards grid
- Update the card grid below the marquee to match the new 9 partners.

### Step 5: Build & Verify
- Run `pnpm build` to ensure no errors.
- Verify the output.
