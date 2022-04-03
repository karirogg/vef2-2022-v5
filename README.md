# Vefforritun 2, 2022. Verkefni 5: Viðburðakerfis framendi með stöðu

[Kynning á verkefni í tíma](https://youtu.be/).

Verkefni heldur áfram með [verkefni 4](https://github.com/vefforritun/vef2-2022-v4/) og bætir við stöðu gegnum vefþjónusturnar úr [verkefni 3](https://github.com/vefforritun/vef2-2022-v3/).

Eftirfarandi eru markmið verkefnisins:

- Notkun á next.js
- React context til að halda utan um stöðu fyrir all react forrit
- Dæmi um geymslu á innskráningarupplýsingum
- Hýsing með Vercel

## Viðmót

Notast skal við sama viðmót og í verkefni 2, eða bæta við og breyta eins og ykkur listir.

Leyfilegt er að nota CSS/Sass og það sem kemur fyrir í sýnilausn að verkefni 2.

Hægt er að sjá [sýnilausn keyrandi](https://vef2-2022-v5-synilausn-vert.vercel.app/).

## Vefþjónustur og gögn

Viðburði skal sækja úr vefþjónustu, annað hvort gefinni [vefþjónustu fyrir sýnilausn á verkefni 3](https://vef2-20222-v3-synilausn.herokuapp.com/), eða ykkar eigin vefþjónustu úr verkefni 3. Athugið að krafa er um að birta skráningar per viðburð sem ekki var krafa í verkefni 3, þannig að ef þið notið ykkar eigin þarf að bæta þeirri virkni við.

Á forsíðu eru viðburðir frá `/events` birtir, fyrir hvern viðburð eru gögn sótt á `/events/:id`. Ekki þarf að útfæra síðuflettingu (e. paging) í viðmóti.

Annar texti sem ekki er til staðar í vefþjónustu skal setja beint inn í verkefnið.

## Virkni

Setja skal upp fjórar síður:

- Forsíðu sem birtir lista af viðburðum frá vefþjónustu
- Stakan viðburð með upplýsingum um viðburð, skráningar og möguleika á að skrá sig, sjá að neðan
- Innskráningarsíðu
- Nýskráningarsíðu

Nota skal routing eins og Next.js setur upp.

Setja skal upp 404 síðu.

Leyfilegt er að endurnýta compontenta úr verkefni 4.

### Innskráning og nýskráning

Útfæra skal innskráningu á móti vefþjónustu með `POST` á `/users/login`. Geyma skal upplýsingar um að notandi sé innskráður í localStorage. Nálgast skal þessar upplýsingar (og setja upplýsingar) í gegnum React context.

Útfæra skal nýskráningu á móti vefþjónustu á `POST` á `/users/register`.

Í báðum tilvikum skal birta villuskilaboð frá vefþjónustu.

Ekki þarf að fylgjast með hvenær token rennur út, en ef reynt er að skrá nota og `401` villa kemur til baka skal skrá notanda út.

Útfæra skal útskráningu sem fjarlægir token úr localStorage.

### Skráning og afskráning á viðburð

Fyrir innskráðan notanda skal birta stöðu skráningar á viðburð fyrir þann notanda. Athuga skal hvort einhver af skráðum notendum sé sá notandi sem innskráður er gegnum `id` á notanda[^1].

Ef notandi er skráður skal bjóða upp á að afskrá með `DELETE` á `/events/:id/register`.

Ef notandi er ekki skráður skal bjóða upp á að skrá sig með `POST` á `/events/:id/register` með athugasemd.

## Tæki og tól

Setja skal upp verkefni með `create next app` (CNA) og nota Sass.

Setja skal upp `eslint` gegnum CNA. Engar villur skulu vera til staðar.

## Hýsing á Vercel

Setja skal upp vefinn á Vercel tengt við GitHub, tengjast skal vefþjónustu, annað hvort gefinni [vefþjónustu fyrir sýnilausn á verkefni 3](https://vef2-20222-v3-synilausn.herokuapp.com/), eða ykkar eigin vefþjónustu úr verkefni 3, gefið að búið sé að bæta við hana að birta skráningar.

Þar sem notendur eru að breyta stöðu, skal athuga hvernig sú staða birtist, skoða skal möguleika um „data fetching“ gegnum [`getServerSideProps`](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props); eða með [`getStaticPaths`](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths) og [`getStaticProps`](https://nextjs.org/docs/api-reference/data-fetching/get-static-props).

## Mat

- 20% Uppsetning á next.js með síðum, routing, stílum og 404 síðu
- 25% Innskráning og geymsla á stöðu með react context í localStorage
- 20% Nýskráning
- 20% Skráning og afskráning á viðburð
- 15% Tæki og tól; verkefni sett upp á Vercel

## Sett fyrir

Verkefni sett fyrir í fyrirlestri miðvikudaginn 23. mars 2022.

## Skil

Skila skal í Canvas í seinasta lagi fyrir lok dags föstudaginn 8. apríl 2022.

Skil skulu innihalda:

- Slóð á verkefni keyrandi á Netlify eða Heroku
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `MarzukIngi`
  - `WhackingCheese`

[^1]: þetta er ekki best lausn á þessu en er ódýr viðbót við sýnilausnina, betra væri að hafa boolean breytu um það hvort innskráður notandi sé skráður eða ekki þegar beðið er um viðburð, þó það þýði að senda verði token með.

---

> Útgáfa 0.1

| Útgáfa | Breyting      |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |
