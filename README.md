 Reseapp

 Om projektet

Reseapp är en webbapplikation där användaren kan utforska olika länder och se information om dem. På startsidan visas en lista över länder med möjlighet att söka efter länder, filtrera efter region och navigera mellan olika sidor.

När användaren klickar på ett land öppnas en detaljsida med mer information, till exempel huvudstad, region, befolkning, språk, valuta och flagga. Det finns även komponenter för att visa väderinformation och en introduktion från Wikipedia.

Applikationen hämtar landinformation från ett externt API och använder React Router för navigering mellan sidor.

 Tekniker och ramverk

 **React** – för att bygga användargränssnittet med komponenter.
 **TypeScript** – för att ange datatyper och göra koden tydligare.
 **Vite** – för utvecklingsmiljön och för att köra applikationen lokalt.
 **React Router** – för navigering mellan startsidan, landssidor och 404-sidan.
 **TanStack React Query** – för att hantera hämtning och cachning av data från API:er.
 **Tailwind CSS** – för att styla gränssnittet.
 **countries.dev** – API för information om länder.

 Varför jag valde dessa tekniker

Jag valde React eftersom det gör det möjligt att dela upp gränssnittet i mindre och återanvändbara komponenter. TypeScript hjälper mig att tydliggöra vilken typ av data funktionerna arbetar med. React Router gör navigeringen mellan sidorna enklare, medan TanStack React Query hjälper till med hanteringen av API-data och cachning.

Tailwind CSS gör det möjligt att styla gränssnittet direkt i komponenterna och skapa en konsekvent design.

 Funktioner

- Visa en lista över länder.
- Söka efter länder utifrån namn.
- Filtrera länder efter region.
- Dela upp resultaten i sidor med sidnumrering.
- Visa en detaljsida för varje land.
- Visa information om flagga, huvudstad, region, befolkning, språk och valuta.
- Visa väderinformation och Wikipedia-introduktion på landssidan.
- Hantera laddning, API-fel och länder som inte hittas.
- Erbjuda en knapp för att försöka hämta information igen om ett fel uppstår.
- Använda URL-parametrar för att representera sökning, filter och aktuell sida.

 Köra projektet lokalt

 1. Klona projektet


git clone 
cd 


 2. Installera beroenden


npm install


 4. Starta utvecklingsservern


npm run dev


Öppna sedan den lokala adress som visas i terminalen,`http://localhost:5173`.

 Fördjupningar

Under utvecklingen har jag arbetat med följande områden:

- **URL-state:** Sökning, regionfilter och sidnumrering hanteras via URL-parametrar. När sökningen eller filtret ändras återställs sidnumret till första sidan.
- **Felhantering:** API-anrop kontrolleras för HTTP-fel och oväntade svar. På landssidan skiljer jag mellan laddning, fel och ett land som inte hittas.
- **Återanvändbara komponenter:** Jag har delat upp gränssnittet i mindre komponenter, exempelvis sökfält, regionfilter, sidnumrering, väderkort och Wikipedia-introduktion.
- **TypeScript:** Jag använder typer för landdata och funktionernas returvärden för att göra koden tydligare.

 AI-redovisning

Jag har använt **ChatGPT** som stöd under utvecklingsarbetet och förberedelserna. Jag har använt verktyget för att få förklaringar av tekniska lösningar, diskutera möjliga sätt att lösa problem och få hjälp med att strukturera och förklara kod.

Jag ansvarar själv för att förstå koden i projektet och kunna förklara hur den fungerar. AI har använts som ett hjälpmedel och inte som en ersättning för att förstå lösningarna.


 Reflektion

Det som gick bra var att dela upp applikationen i mindre komponenter och skapa en tydlig struktur för sidorna och API-anropen. Det svåraste var att få sökning, regionfilter och sidnumrering att fungera tillsammans på ett bra sätt med URL-parametrar. Jag lärde mig mer om hur URL-state kan användas för att göra en applikation enklare att navigera i och dela med andra. Nästa gång skulle jag planera dataflödet och felhanteringen ännu tidigare i projektet och testa olika scenarier löpande.

 Deployment

Applikationen finns publicerad här:

https://elias-reseapp.netlify.app/