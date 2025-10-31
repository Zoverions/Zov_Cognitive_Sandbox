
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    try:
        page.goto("http://localhost:3000/")

        # 1. Verify Sandbox View
        expect(page.get_by_role("heading", name="Cognitive Sandbox")).to_be_visible(timeout=10000)
        textarea = page.locator("textarea")
        textarea.fill("The quick brown fox jumps over the lazy dog.")
        analyze_button = page.get_by_role("button", name="Analyze Text & Extract Concepts")
        analyze_button.click()
        keyword_button = page.get_by_role("button", name="quick brown fox")
        expect(keyword_button).to_be_visible(timeout=10000)
        keyword_button.click()
        generate_button = page.get_by_role("button", name="Generate Novel Idea")
        generate_button.click()
        hypothesis = page.locator("div:has-text('Generated Hypothesis:')")
        expect(hypothesis).to_be_visible(timeout=20000)
        page.screenshot(path="jules-scratch/verification/sandbox_view.png")
        print("Screenshot of Sandbox view saved.")

        # 2. Verify "How It Works" View
        how_it_works_link = page.get_by_role("link", name="How It Works")
        how_it_works_link.click()
        expect(page.get_by_role("heading", name="How It Works: The ZCEB Framework")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/how_it_works_view.png")
        print("Screenshot of 'How It Works' view saved.")

        # 3. Verify Framework View
        framework_link = page.get_by_role("link", name="Foundational Manifold and Unified Potential")
        framework_link.click()
        expect(page.get_by_role("heading", name="Foundational Manifold and Unified Potential")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/framework_view.png")
        print("Screenshot of Framework view saved.")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
