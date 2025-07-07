# URL Analyzer

A **React + Next.js** web app that analyzes the performance of any website URL.
- **Load Time** — total time taken to fetch and analyze the page
- **Page Size** — combined size of HTML, CSS, JS, images (KB)
- **Number of Requests** — total HTTP requests made


---

##  Live Demo

 [https://analyzewebsite.vercel.app](https://analyzewebsite.vercel.app)

### How to Use the Demo

- Enter a website URL (e.g. https://example.com)
- Click **Analyze**
- See:
  - Load time in milliseconds
  - Total page size in KB
  - Number of network requests

---
## Screenshots
![Demo](/public/demo.png)  
*showing URL input and results*
## Run Locally

```bash
git clone https://github.com/raibikram/url-Analyzer.git
cd url-analyzer
npm install
npm run dev
````

Then visit:

```
http://localhost:3000
```

---

## Why Both Got and Cheerio?

- **`got`** is used to **fetch HTML content** from the target URL and to perform **HEAD requests** to get asset sizes efficiently without downloading the full files.

- **`cheerio`** is used to **parse the fetched HTML** on the server side, so I can extract all the asset URLs (scripts, stylesheets, images) that need to be analyzed.

Together, they let the app:

- Download and inspect the webpage HTML  
- Extract asset links to analyze  
- Efficiently measure asset sizes and counts without full downloads  

---

###  Resources

- got: https://github.com/sindresorhus/got  
- cheerio: https://cheerio.js.org

---

## AI Usage Disclosure

I used **ChatGPT** strictly as a **research and learning tool** during development.

Specifically, ChatGPT helped me:  

- Understand how to fetch HTML in a Next.js API route  
- Learn how to parse HTML on the server with libraries like Cheerio  
- Discover how to perform HEAD requests to check asset sizes without downloading full files  
- Why use both got and cheerio for web scraping in Node.js? 

This approach helped me solve problems faster while ensuring I fully understood the code I wrote.

---

## Project Structure

```
app/
  ├── api/analyze/route.ts   # API logic for analysis
  ├── page.tsx               # Frontend UI
  └── globals.css            

public/
  └── demo.png

README.md
package.json
```



