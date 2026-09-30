import os
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

@pytest.fixture
def driver():
    options = webdriver.ChromeOptions()
    if os.getenv("HEADLESS", "false").lower() == "true":
        options.add_argument("--headless=new")
    options.add_argument("--window-size=1440,1000")
    browser = webdriver.Chrome(options=options)
    yield browser
    browser.quit()

def test_navigation_omits_removed_pages_and_admin(driver):
    driver.get(BASE_URL)
    wait = WebDriverWait(driver, 10)
    wait.until(EC.visibility_of_element_located((By.XPATH, "//*[@data-testid='overview-page']")))
    assert driver.find_element(By.XPATH, "//*[@data-testid='nav-overview']")
    assert driver.find_element(By.XPATH, "//*[@data-testid='nav-mcp-servers']")
    assert driver.find_element(By.XPATH, "//*[@data-testid='nav-tools']")
    assert driver.find_element(By.XPATH, "//*[@data-testid='nav-prompts']")
    assert driver.find_element(By.XPATH, "//*[@data-testid='nav-integrations']")
    assert driver.find_element(By.XPATH, "//*[@data-testid='nav-services']")
    assert driver.find_element(By.XPATH, "//*[@data-testid='nav-logs']")
    assert not driver.find_elements(By.XPATH, "//*[normalize-space()='Resources']")
    assert not driver.find_elements(By.XPATH, "//*[normalize-space()='Playground']")
    assert not driver.find_elements(By.XPATH, "//*[normalize-space()='Settings']")
    assert not driver.find_elements(By.XPATH, "//*[normalize-space()='Admin']")

def test_add_server_form_uses_xpath_locators(driver):
    driver.get(f"{BASE_URL}/servers")
    wait = WebDriverWait(driver, 10)
    wait.until(EC.visibility_of_element_located((By.XPATH, "//*[@data-testid='servers-page']")))
    driver.find_element(By.XPATH, "//button[@data-testid='add-server-btn']").click()
    wait.until(EC.visibility_of_element_located((By.XPATH, "//*[@data-testid='add-server-modal']")))
    assert driver.find_element(By.XPATH, "//input[@data-testid='server-name-input']")
    assert driver.find_element(By.XPATH, "//select[@data-testid='server-transport-select']")
    assert driver.find_element(By.XPATH, "//button[@data-testid='save-server-btn']")
