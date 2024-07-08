const { test, chromium, expect } = require('@playwright/test');

test('Oona Automation', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await context.grantPermissions(['geolocation']);


  // Navigate to the initial page
  await page.goto('https://auth.uat.myoona.id/realms/id_rlm_external/protocol/openid-connect/auth?client_id=id_cl_kahoona_app&redirect_uri=https%3A%2F%2Fkahoona.uat.myoona.id%2Flogin&state=18008918-327c-4623-8fbe-595933693364&response_mode=fragment&response_type=code&scope=openid&nonce=12773f06-1301-4231-b318-411d6b25c4ee&ui_locales=en');

  // login
  await page.getByPlaceholder('Enter phone number').fill('81370987561');
  await page.getByLabel('I have read and accept the').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // otp input
  await page.locator('#code').fill('666666');
  await page.getByRole('button', { name: 'Verify' }).click();

  const userlogin = await page.getByText('Hi Pratiwi Mitra!').innerText();
  console.log(userlogin);
  expect(userlogin).toContain('Hi Pratiwi Mitra');
  // click button personal accident
  await page.getByText('Personal Accident').click();
  await page.getByRole('button', { name: 'close No' }).click();

  // click button skip this step
  await page.getByRole('button', { name: 'Skip this Step' }).click();
  await page.getByLabel('I hereby agree to the').check();
  await page.getByRole('button', { name: 'Continue' }).click();

 

  // input Personal Accident Insurance Policy
  await page.getByPlaceholder('Enter Insured Name').fill('Dummy Dummy');
  await page.getByPlaceholder('Choose Sum Insured').click();
  await page.getByLabel('', { exact: true }).nth(3).check();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.getByRole('textbox').nth(3).fill('1');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(1000);
  
  const quote_summary = await page.getByRole('heading', { name: 'Quote Summary' }).innerText();
  console.log(quote_summary);
  expect(quote_summary).toContain('Quote Summary');


  const harga_personal_accident = await page.getByText('1 × Personal Accident 500 MillionRp').innerText();
  console.log(harga_personal_accident);


  const discount = await page.getByText('Discount- Rp').innerText();
  console.log(discount);

  // berhasil membuat policy
  await page.getByRole('button', { name: 'Next' }).click();
  const success = await page.locator('//*[@id="root"]/div[1]/div/div[2]/div/div[2]/div[1]/b').innerText();
  console.log('accidentquotesuccess:', success);


  await page.getByRole('button', { name: 'Create Policy' }).click();

  // upload ktp
  await page.getByRole('button', { name: 'Browse files' }).click();
  const inputFile = await page.locator('input[type="file"]');
  const filePath = 'Dokumen\\ktp-sample.jpg';
  await inputFile.setInputFiles(filePath);

  //verify ktp number
  await page.getByRole('button', { name: 'Verify' }).click();


  // masukkan tanggal lahir
  const inputLocator = page.locator("//input[@id='insuredDob']");
  await inputLocator.click();
  await inputLocator.fill('03/12/1974');
  await page.keyboard.press('Enter');


  // masukkan alamat
  await page.locator('#root img').nth(2).click();
  await page.getByPlaceholder('Search for a location').fill('Jakarta');
  await page.getByText('Jakarta, Indonesia', { exact: true }).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByLabel('Close', { exact: true }).click();


  // masukkan tanggal efektif
  const efektifdate = page.locator("//input[@id='effectiveDate']");
  await efektifdate.click();
  await efektifdate.fill('30/06/2024');
  await page.keyboard.press('Enter');

  // check hardcopy
  await page.getByLabel('Hard Copy').check();

  // masukkan alamat hardcopy
  const alamat = await page.locator("//input[@id='address']").inputValue();
  await page.locator("//textarea[@id='addressForHardCopy']").fill(alamat);
  await expect(page.locator("//textarea[@id='addressForHardCopy']")).toBeVisible();


  await page.getByPlaceholder('Enter Insured Phone Number').fill('081370987561');
  await expect(page.getByPlaceholder('Enter Insured Phone Number')).toBeVisible();

  await page.getByPlaceholder('Enter Insured Email Address').fill('pratiwi.situmorang@oona-insurance.co.id');
  await expect(page.getByPlaceholder('Enter Insured Email Address')).toBeVisible();

  await page.getByPlaceholder('Enter Name').fill('Pratiwi Situmorang');
  await expect(page.getByPlaceholder('Enter Name')).toBeVisible();

  await page.getByLabel('Beneficiary Relation (').click();
  await page.getByText('Child').click();
  // await expect(page.getByText('Child')).toBeVisible();


  const beneficiary = await page.getByLabel('Beneficiary\'s Date of Birth');
  await beneficiary.click();
  await beneficiary.fill('31/08/2000');
  await page.keyboard.press('Enter');
  await expect(beneficiary).toBeVisible();

  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();


  const informasi_polis = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]").innerText();
  console.log('informasi_polis:', informasi_polis);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]")).toBeVisible();

  
  const tanggal_mulai_polis = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[2]").innerText();
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[2]")).toBeVisible();
  console.log('tanggal_mulai_polis:', tanggal_mulai_polis);

  const tanggal_berakhir_polis = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[3]").innerText()
  console.log('tanggal_berakhir_polis:', tanggal_berakhir_polis);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[3]")).toBeVisible();

  const informasi_tertanggung = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[1]/div[1]").innerText();
  console.log('informasi_tertanggung:', informasi_tertanggung);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[1]/div[1]")).toBeVisible();

  const nama_tertanggung = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[2]").innerText();
  console.log('nama_tertanggung:', nama_tertanggung);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[2]")).toBeVisible();

  const tanggal_lahir = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[3]").innerText();
  console.log('tanggal_lahir:', tanggal_lahir);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[3]")).toBeVisible();

  const alamat_tertanggung = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[4]").innerText();
  console.log('alamat:', alamat_tertanggung);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[4]")).toBeVisible();

  const no_hp_tertanggung = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[5]").innerText();
  console.log('no_hp_tertanggung:', no_hp_tertanggung);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[5]")).toBeVisible();

  const alamat_email_tertanggung = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[5]").innerText();
  console.log('alamat_email_tertanggung:', alamat_email_tertanggung);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[5]")).toBeVisible();

  const nama_penerima_manfaat = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[5]").innerText();
  console.log('nama_penerima_manfaat', nama_penerima_manfaat);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[5]")).toBeVisible();

  const tanggal_lahir_penerima_manfaat = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[4]/div[1]/div[3]").innerText();
  console.log('tanggal_lahir_penerima_manfaat:', tanggal_lahir_penerima_manfaat);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[4]/div[1]/div[3]")).toBeVisible();

  const address_hardcopy = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[5]/div[1]/div[1]").innerText();
  console.log('address_hardcopy:', address_hardcopy);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[5]/div[1]/div[1]")).toBeVisible();
  
  const rincian_pembayaran = await page.locator("//div[contains(text(),'Rincian Pembayaran')]").innerText();
  console.log('rincian_pembayaran:', rincian_pembayaran);
  await expect(page.locator("//div[contains(text(),'Rincian Pembayaran')]")).toBeVisible();

  const personal_pembayaran = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[6]/div[1]/div[2]").innerText();
  console.log('personal_pembayaran:', personal_pembayaran);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[6]/div[1]/div[2]")).toBeVisible();

  const biaya_admin = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[6]/div[1]/div[3]").innerText();
  console.log('biaya_admin:', biaya_admin);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[6]/div[1]/div[3]")).toBeVisible();

  const diskon = await page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[6]/div[1]/div[4]").innerText();
  console.log('diskon:', diskon);
  await expect(page.locator("//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[6]/div[1]/div[4]")).toBeVisible();

  const total_pembayaran = await page.locator("//div[contains(text(),'Rp 535.000')]").innerText();
  console.log('total_pembayaran:', total_pembayaran);
  await expect(page.locator("//div[contains(text(),'Rp 535.000')]")).toBeVisible();


  

  await page.getByRole('button', { name: 'Bayar' }).click();
  await expect(page.getByRole('button', { name: 'Bayar' })).toBeVisible();

  await page.getByRole('button', { name: 'Pay Later' }).click();
  await expect(page.getByRole('button', { name: 'Pay Later' })).toBeVisible();

  const berhasil = await page.locator("//b[contains(text(),'E-polis berhasil dikirimkan ke email kamu')]").innerText();
  console.log('Berhasil!', berhasil);

  await browser.close();


});