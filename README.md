1. **ui-test-execution.webm** - видео успешного прохождения теста из задания 1.
2. **BetelgeuseImagined_EsoCalcada_2662.jpg** - изображение, полученное на первом шаге теста из задания 2.
3. **pastebin-data.txt** - текстовый файл, содержащий ссылку на текст в pastebin, полученную на втором шаге теста из задания 2.

# How to execute on local
1. Install latest Google Chrome browser. For example "85.0.4183.121" version.
2. Install stable Node.js. For example "12.18.4" version.
3. Clone or download repository https://github.com/Angakokv/tech-hostaway-github.
4. Go to the root folder of cloned repository.
5. Open `package.json` and replace value "85.0.4183.83" by your Google Chrome version. For example by "85.0.4183.121" version.
6. Run command `npm install` from command line.
7. Run command `protractor protractor.ci.conf.js --params --params.headlessBrowser=false` from command line to execute all tests.

You will see tests execution in command line with logs.

# How to generate test report
1. After tests execution run command `npm run e2e-generate-allure-report` from command line.
2. Run command `npm run e2e-open-allure-report` from command line.

Test report will be opened in default browser. 
