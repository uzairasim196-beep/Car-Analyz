# Car-Analyz

Shopify theme for boat history reports and HIN verification.

## Enable report checkout

1. Create or select your boat history report product in Shopify. Set its price, make it active and publish it to the Online Store channel. Configure it as a product that does not require shipping if the report is delivered digitally.
2. Open the theme editor, then Theme settings → Report checkout.
3. Select the Boat history report product. The home page uses this selection. Product pages use the product currently being viewed and its selected or first available variant.
4. Keep or edit the Report type shown at checkout, then save.

The only entry validation is a maximum of 12 characters. Short entries, spaces, symbols and an empty field are accepted. The entered value is preserved without trimming or changing its case. It does not query a vessel database.

Get Report adds one report with public line item properties named HIN and Report Type, then opens Shopify checkout directly. The properties remain attached to the purchased item in the order. The price, currency and payment methods come from the store. Existing unrelated cart items are preserved. Repeating the same HIN for the same product and report type reuses an existing matching cart item.

Test the flow on the Shopify hosted storefront with a valid test HIN and confirm the checkout item shows the HIN and report type. No payment is needed to check those fields. Report generation and delivery require your own fulfillment process or service.

## Testimonials

Three editable sample cards appear after the report contents and before the statistics on the home and product pages. Replace the sample text, names, descriptions, photos and ratings with genuine customer feedback in the Testimonials section of the theme editor.
