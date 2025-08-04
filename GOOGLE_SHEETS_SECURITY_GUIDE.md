# 📊 Bezpečný návod na Google Sheets integrace pro denní menu

## 🔒 Bezpečnostní upozornění

**DŮLEŽITÉ**: API klíče nesmí být umístěny v JavaScriptu! Jsou viditelné všem návštěvníkům webu.

## 🎯 Doporučené bezpečné řešení: CSV Export

### ✅ Krok 1: Příprava Google Sheets

1. **Vytvořte Google Sheets** s touto strukturou:

```
    A              B              C                  D
1   Gramáž         Pokrm          Alergeny           Cena
2   300ml          Polévka        1,3,7              50 Kč
3   350g           Menu 1         1,3,7              150 Kč
4   400g           Menu 2         1,3                165 Kč
5   380g           Menu 3         7,9                180 Kč
6   150g           Dezert         1,3,7              65 Kč
```

2. **Příklad obsahu s alergeny:**

```
A1: 300ml    B1: Gulášová polévka       C1: 1,3,7        D1: 50 Kč
A2: 350g     B2: Svíčková na smetaně    C2: 1,3,7        D2: 195 Kč
A3: 300g     B3: Kuřecí řízek           C3: 1,3          D3: 165 Kč
A4: 400g     B4: Vegetariánské rizoto   C4: 7,9          D4: 140 Kč
A5: 120g     B5: Palačinky              C5: 1,3,7        D5: 65 Kč
```

**Číslování alergenů podle EU:**

- 1: Obiloviny (lepek)
- 2: Korýši
- 3: Vejce
- 4: Ryby
- 5: Arašídy
- 6: Sójové boby
- 7: Mléko
- 8: Skořápkové plody
- 9: Celer
- 10: Hořčice
- 11: Sezam
- 12: Oxid siřičitý
- 13: Vlčí bob
- 14: Měkkýši

### ✅ Krok 2: Publikování jako CSV

1. **V Google Sheets klikněte**: `File` → `Share` → `Publish to web`
2. **Vyberte**: `Entire Document` a **CSV** (ne Web page!)
3. **Zaškrtněte**: "Automatically republish when changes are made"
4. **Klikněte**: `Publish`
5. **Zkopírujte odkaz** - bude vypadat takto:
   ```
   https://docs.google.com/spreadsheets/d/VAŠE_ID_ZDE/export?format=csv&gid=0
   ```

### ✅ Krok 3: Konfigurace webu

V souboru `script.js` najděte `GOOGLE_SHEETS_CONFIG` a upravte jen `SHEET_ID`:

```javascript
const GOOGLE_SHEETS_CONFIG = {
  SHEET_ID: "VAŠE_SHEETS_ID_ZDE", // Jen tuto část změňte!
  // Zbytek nechte jak je
};
```

**Kde najít SHEET_ID?**
Z URL: `https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789/edit`
Zkopírujte jen část: `1ABC123DEF456GHI789`

## 🚨 Alternativní řešení (pokud CSV nefunguje)

### Možnost A: Veřejná API s omezeními

```javascript
// Vytvořte API klíč s IP omezeními v Google Cloud Console
// Omezení: jen vaše doména + IP adresy
const API_KEY = "your-restricted-api-key";
```

### Možnost B: Serverová proxy

```javascript
// Vytvořte jednoduchou proxy na vašem serveru
// PHP příklad:
<?php
$data = file_get_contents('https://sheets.googleapis.com/v4/...');
header('Content-Type: application/json');
echo $data;
?>
```

### Možnost C: Statický JSON soubor

```javascript
// Jednoduše vytvořte JSON soubor na serveru
// a aktualizujte ho ručně nebo automaticky
fetch("./daily-menu.json")
  .then((response) => response.json())
  .then((data) => updateMenu(data));
```

## 🎯 Výhody CSV řešení:

✅ **Bezpečné** - žádné API klíče v kódu  
✅ **Jednoduché** - jen publikování a kopírování ID  
✅ **Rychlé** - CSV je lehký formát  
✅ **Automatické** - změny se projeví okamžitě  
✅ **Spolehlivé** - Google Sheets je stabilní služba

## 🔧 Testování CSV integrace:

1. **Otevřete konzoli** v prohlížeči (F12)
2. **Sledujte zprávy:**
   - ✅ `"Menu úspěšně načteno z Google Sheets CSV"`
   - ⚠️ `"Používám fallback menu"` = problém s ID nebo publikováním

## 🛠️ Jak upravovat menu:

1. **Otevřete váš Google Sheets**
2. **Upravte obsah podle struktury:**
   - **Sloupec A**: Gramáž (např. "300ml", "350g")
   - **Sloupec B**: Název pokrmu (např. "Gulášová polévka")
   - **Sloupec C**: Čísla alergenů oddělená čárkami (např. "1,3,7")
   - **Sloupec D**: Cena (např. "50 Kč")
3. **Změny se automaticky projeví** na webu při dalším načtení

### 📝 Příklad správného vyplnění:

```
Řádek 1: 300ml | Bramboračka | 1,7,9 | 45 Kč
Řádek 2: 400g | Svíčková | 1,3,7 | 195 Kč
Řádek 3: 350g | Kuřecí steak | 3 | 165 Kč
Řádek 4: 300g | Grilovaná zelenina | 9 | 140 Kč
Řádek 5: 150g | Tiramisu | 1,3,7 | 75 Kč
```

## 💡 Tipy pro bezpečnost:

- **Nikdy** nepoužívejte API klíče v JavaScriptu
- **Vždy** používejte CSV export nebo serverovou proxy
- **Pravidelně** kontrolujte, kdo má přístup k vašemu Google Sheets
- **Omezte** přístup k editaci jen na potřebné osoby

## 🆘 Řešení problémů:

**Menu se nenačítá:**

1. Zkontrolujte, zda je Google Sheets publikován jako CSV
2. Ověřte SHEET_ID v konfiguraci
3. Zkuste URL ručně v prohlížeči

**CORS chyby:**

- CSV export tyto problémy obvykle neřeší

**Pomalé načítání:**

- CSV je nejrychlejší možnost, problém může být v síti

## 🔧 Pokročilé možnosti:

### Automatické obnovování

```javascript
// Obnovení menu každých 30 minut
setInterval(() => {
  initializeDailyMenu();
}, 1800000);
```

### Cache systém

```javascript
// Ukládání do localStorage pro rychlejší načítání
localStorage.setItem("daily-menu", JSON.stringify(menuData));
```

### Více listů

```javascript
// Pro víkendové menu použijte jiný GID
const weekendSheetUrl = `...&gid=123456`;
```
