# 📊 Bezpečný návod na Google Sheets integrace pro denní menu

## � Bezpečnostní upozornění

**DŮLEŽITÉ**: API klíče nesmí být umístěny v JavaScriptu! Jsou viditelné všem návštěvníkům webu.

## 🎯 Doporučené bezpečné řešení: CSV Export

### ✅ Krok 1: Příprava Google Sheets

1. **Vytvořte Google Sheets** s touto strukturou:

```
    A              B
1   Polévka        Cena polévky
2   Menu 1         Cena menu 1
3   Menu 2         Cena menu 2
4   Menu 3         Cena menu 3
5   Dezert         Cena dezertu
```

2. **Příklad obsahu:**

```
A1: Gulášová polévka          B1: 50 Kč
A2: Svíčková na smetaně       B2: 195 Kč
A3: Kuřecí řízek              B3: 165 Kč
A4: Vegetariánské rizoto      B4: 140 Kč
A5: Palačinky                 B5: 65 Kč
```

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

```javascript
const GOOGLE_SHEETS_CONFIG = {
  // Vaše Google Sheets ID
  SHEET_ID: "VÁŠ_SHEETS_ID_ZDE",

  // Váš Google API klíč
  API_KEY: "VÁŠ_API_KLÍČ_ZDE",

  // Název listu (obvykle "Sheet1" nebo podle vašeho pojmenování)
  SHEET_NAME: "Sheet1",

  // Mapování buněk - upravte podle potřeby
  CELLS: {
    soup: "A1", // Polévka
    soupPrice: "B1", // Cena polévky
    menu1: "A2", // Hlavní jídlo 1
    menu1Price: "B2", // Cena hlavního jídla 1
    menu2: "A3", // Hlavní jídlo 2
    menu2Price: "B3", // Cena hlavního jídla 2
    menu3: "A4", // Hlavní jídlo 3
    menu3Price: "B4", // Cena hlavního jídla 3
    dessert: "A5", // Dezert
    dessertPrice: "B5", // Cena dezertu
  },
};
```

## 🎯 Výhody tohoto řešení:

✅ **Dynamické menu** - změny v Google Sheets se projeví okamžitě na webu
✅ **Krásný design** - menu vypadá stejně jako zbytek webu
✅ **Snadná úprava** - stačí upravit buňky v Google Sheets
✅ **Fallback systém** - pokud API nefunguje, zobrazí se základní menu
✅ **Rychlé načítání** - API je rychlejší než iframe

## 🛠️ Jak upravovat menu:

1. Otevřete váš Google Sheets
2. Upravte obsah buněk A1-A5 (jídla) a B1-B5 (ceny)
3. Změny se automaticky projeví na webu při dalším načtení

## 🔧 Testování:

Po nastavení otevřete konzoli v prohlížeči (F12) a sledujte zprávy:

- ✅ "Menu úspěšně načteno z Google Sheets" = vše funguje
- ⚠️ "Používám fallback menu" = problém s API nebo konfigurací

## 💡 Tipy:

- API klíč uchovávejte v bezpečí
- Pravidelně kontrolujte funkčnost
- Pro více sheet můžete změnit `SHEET_NAME`
- Buňky můžete přemapovat podle vašich potřeb

## 🆘 Řešení problémů:

**Chyba 403**: Zkontrolujte, zda je Google Sheets API povoleno
**Chyba 400**: Zkontrolujte ID sheets a název listu
**Prázdné menu**: Zkontrolujte, zda buňky obsahují data
