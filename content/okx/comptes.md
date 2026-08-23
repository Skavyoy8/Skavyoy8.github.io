---
titre: "Les différents comptes d'une plateforme"
section: "okx"
ordre: 80
resume: "Pourquoi il faut souvent transférer ses fonds d'un compte à l'autre à l'intérieur de la même application avant de pouvoir s'en servir."
niveau: "bases"
prerequis: ["/okx/on-chain-off-chain"]
termes: ["compte-financement", "compte-trading", "transfert-interne", "sous-compte", "uid"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — transférer des fonds entre ses comptes"
    url: "https://www.okx.com/help/assets-transfer-app-web-based"
statut: "redige"
---

**Une plateforme sépare ton argent en plusieurs comptes internes. Ce ne sont pas des lieux différents, seulement des étiquettes dans sa base de données.**

## Pourquoi ça existe

C'est la première chose qui déroute : on dépose de l'argent, on veut acheter, et l'application annonce un solde à zéro. Les fonds sont bien là — ils sont simplement rangés dans un autre compartiment.

Cette séparation existe pour deux raisons.

**Le cloisonnement.** Isoler les fonds destinés à des activités risquées de ceux qui dorment tranquillement. Si une position à effet de levier tourne mal, elle ne peut consommer que ce qui se trouve dans le compartiment concerné.

**La comptabilité.** Les obligations réglementaires ne sont pas les mêmes selon l'usage des fonds, et il faut pouvoir les distinguer clairement.

## Comment ça marche

Deux compartiments principaux, dont les noms varient selon les plateformes :

**Le compte de financement.** C'est le hall d'entrée. Les dépôts y arrivent, les retraits en partent. Les fonds y sont au repos.

**Le compte de trading.** C'est là qu'on achète et qu'on vend. Un ordre ne peut utiliser que ce qui s'y trouve.

Le transfert de l'un à l'autre est **instantané et gratuit** — et cette gratuité n'est pas une faveur commerciale. Elle vient du fait que rien ne bouge réellement : la plateforme change une étiquette dans sa base de données. Aucune blockchain n'est sollicitée.

> [!exemple] Le même argent, deux tiroirs
> C'est comme un compte courant et un livret dans la même banque. Virer de l'un à l'autre est immédiat et gratuit, parce que l'argent ne sort jamais de l'établissement. Virer vers une autre banque, en revanche, prend du temps et coûte parfois quelque chose.
>
> Ici, « une autre banque », c'est la blockchain.

## Un exemple concret

Le parcours complet d'un premier achat :

1. Tu envoies des fonds depuis ton portefeuille → ils arrivent sur le **compte de financement**.
2. Tu veux acheter → tu transferts vers le **compte de trading**. Instantané, gratuit.
3. Tu passes ton ordre → il s'exécute.
4. Tu veux tout sortir → tu retransfères vers le **compte de financement**, puis tu demandes un retrait.

Deux transferts internes, invisibles de l'extérieur, et deux vraies opérations sur la blockchain aux extrémités.

## Ce qu'il faut savoir

> [!piege] Un solde à zéro ne veut pas dire que l'argent a disparu
> Il est presque toujours dans l'autre compartiment. Le récapitulatif global de l'application affiche le total des deux.

> [!piege] Le transfert interne n'est pas un retrait
> Beaucoup de débutants croient avoir « sorti » leurs fonds parce qu'ils les ont déplacés d'un compte à l'autre. Ils sont toujours entièrement chez la plateforme. Un vrai retrait envoie vers une adresse que tu contrôles.

> [!piege] Les sous-comptes ne changent rien à la garde
> Certaines plateformes permettent de créer des sous-comptes pour séparer ses activités. C'est de l'organisation, pas de la sécurité : tout appartient toujours au même titulaire et à la même entreprise.

## Pour aller plus loin

- [On-chain et off-chain](/okx/on-chain-off-chain) — pourquoi un transfert interne est gratuit
- [Dépôts et retraits](/okx/depots-retraits) — les vraies entrées et sorties
