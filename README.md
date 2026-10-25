# CheckHINHistory

Shopify theme for boat history reports and HIN verification.

## Enable report checkout

The disabled Get Report button and the message "Online ordering is not available yet" mean that the form has no available Shopify product to purchase. Uploading a theme does not create a product or connect one automatically.

1. In the CheckHINHistory Shopify admin, open Products. Open your existing report product or choose Add product and name it Boat History Report. Set your selling price.
2. Set the product status to Active. In Publishing, include Online Store and save.
3. In Shipping, deactivate Physical product because the report is delivered digitally. If you do not limit the number of reports sold, turn off inventory tracking. If you keep inventory tracking, ensure the variant has available stock. Save.
4. Open Online Store → Themes. Use the updated GitHub theme, or upload the latest CheckHINHistory ZIP through Import theme → Upload zip file (this may appear as Add theme). Open Customize or Edit theme for that exact theme.
5. Choose Home page, then click Hero in the section list. Under Report checkout, select your product in Report product. Click Save. The preview should show "Report product connected:" followed by the product name and price. This status is visible only in the theme editor.
6. Alternatively, leave the Hero selection empty and choose the product in Theme settings → Report checkout → Boat history report product. Keep Report type shown at checkout set to Boat History Report, or enter your own description. Save. A Hero selection overrides the global setting on the home page. Product pages use their current product.
7. Open the theme preview in a separate tab. Enter a value such as ABC123 and click Get Report. Confirm that checkout shows the selected product, its price, HIN: ABC123 and Report Type: Boat History Report. Test a value longer than 12 characters by pasting it into the form; it should display the length error. You do not need to pay to verify this flow.
8. Once the preview works, publish that theme if it is not already the current theme. If you import another ZIP later, select and save the product in that newly imported theme as well.

If the product selector is empty, check that the product exists in this same store, is Active and is published to Online Store. If the editor reports that the product cannot be purchased, check inventory and market availability. The checkout price and available payment methods come from your Shopify store settings.

The only entry validation is a maximum of 12 characters. Short entries, spaces, symbols and an empty field are accepted. The entered value is preserved without trimming or changing its case. It does not query a vessel database.

Get Report adds one report with public line item properties named HIN and Report Type, then opens Shopify checkout directly. The properties remain attached to the purchased item in the order. The price, currency and payment methods come from the store. Existing unrelated cart items are preserved. Repeating the same HIN for the same product and report type reuses an existing matching cart item.

Test the flow on the Shopify hosted storefront with a valid test HIN and confirm the checkout item shows the HIN and report type. No payment is needed to check those fields. Report generation and delivery require your own fulfillment process or service.

## Testimonials

Three editable sample cards appear after the report contents and before the statistics on the home and product pages. Replace the sample text, names, descriptions, photos and ratings with genuine customer feedback in the Testimonials section of the theme editor.

## Brand and email

The theme uses CheckHINHistory and checkhinhistory@gmail.com. The updated logo is bundled for both header and footer. In Theme settings → Branding, clear Custom logo to use the bundled logo if your store still has an older uploaded image selected. Confirm Brand name and Public contact email after syncing an existing theme, since Shopify may preserve store customizations.

Shopify store details, checkout branding, domains, notification sender settings, policy text and the contact form recipient are managed in Shopify admin and are not changed by importing this theme. Update those separately for the rebrand.
