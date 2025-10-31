
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    try:
        page.goto("http://localhost:3000/")

        # Expect the Sandbox view to be the default
        expect(page.get_by_role("heading", name="Cognitive Sandbox")).to_be_visible(timeout=10000)

        # Paste text into the textarea
        textarea = page.locator("textarea")
        textarea.fill("The quick brown fox jumps over the lazy dog.")

        # Click the "Analyze" button
        analyze_button = page.get_by_role("button", name="Analyze Text & Extract Concepts")
        analyze_button.click()

        # Wait for keywords to appear and click one
        keyword_button = page.get_by_role("button", name="quick brown fox")
        expect(keyword_button).to_be_visible(timeout=10000)
        keyword_button.click()

        # Click the "Generate" button
        generate_button = page.get_by_role("button", name="Generate Novel Idea")
        generate_button.click()

        # Wait for the hypothesis to appear
        hypothesis = page.locator("div:has-text('Generated Hypothesis:')")
        expect(hypothesis).to_be_visible(timeout=20000)

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/sandbox_feature.png")
        print("Screenshot saved to jules-scratch/verification/sandbox_feature.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
