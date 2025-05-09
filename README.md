# Dice Drag & Drop Game - Par Odin

Ce projet est une application React inspirée du jeu "Par Odin". L'objectif est de gérer et équilibrer les équipes en utilisant des dés ayant des spécificités différentes. Les utilisateurs déplacent les dés entre différentes zones (réserve, équipe A, équipe B) pour équilibrer les scores des équipes et passer au niveau suivant.

## Fonctionnalités

- **Drag & Drop** : Déplacez des dés entre différentes zones (réserve, équipe A, équipe B).
- **Création de niveaux dynamiques** : Ajoutez des dés spécifiques à la réserve et gérez les équipes.
- **Équilibrage des équipes** : L'objectif du jeu est d'équilibrer les scores des équipes pour réussir à passer au niveau suivant.
- **Validation** : Un bouton "Valider" permet de récupérer et afficher les équipes sélectionnées avec leurs dés respectifs.

## Dés du jeu "Par Odin"

Le jeu utilise plusieurs types de dés, chacun ayant des spécificités uniques. Voici la liste des types de dés disponibles dans le jeu :

1. **Héros (Hero)**
   - **Valeur** : 3

2. **Capitaine (Captain)**
   - **Valeur** : 2

3. **Soldat (Soldier)**
   - **Valeur** : 1

4. **Traître (Traitor)**
   - **Valeur** : 1
   - **Spécificité** : Le traître a une valeur faible mais une influence stratégique importante. Si le traître est dans une équipe qui contient un héros, la valeur du héros devient 0. Ce dé peut jouer un rôle important dans la stratégie de l'équipe, car il peut affaiblir les héros adverses.

5. **Mage (Mage)**
   - **Valeur** : 0

6. **Maudit (Cursed)**
   - **Valeur** : -1
   - **Spécificité** : Le maudit a une valeur négative, ce qui le rend dangereux pour l'équipe. Sa gestion doit être prudente, car il peut désavantager l'équipe si placé dans la mauvaise zone.

## Enjeux du projet

Ce projet n’a pas uniquement été développé dans le but de créer un jeu interactif. L’un des objectifs principaux était d'appliquer une méthodologie de développement axée sur la **testabilité** du code, avec une approche **Test-Driven Development (TDD)**. Cette approche a permis de garantir la qualité du code tout au long de la conception de l’application.

### Approche TDD

Le développement de ce projet a suivi une approche **Test-Driven Development (TDD)**. Cela signifie que les tests étaient rédigés avant même la réalisation du code, assurant ainsi une couverture de tests maximale et une meilleure gestion des erreurs dès le début du développement.

### Tests End-to-End

Une fois le jeu développé, des **tests End-to-End** (E2E) ont été mis en place pour garantir que l'application fonctionne de manière fluide et que les fonctionnalités telles que le **drag-and-drop**, l'affichage des dés et les interactions entre les zones sont bien respectées. Ces tests simulent l'interaction de l'utilisateur avec l'application pour s'assurer que tout fonctionne comme prévu.

### Intégration Continue (CI)

Afin d’assurer une qualité de code constante, une **intégration continue (CI)** a été mise en place via GitHub Actions. Cela permet de tester automatiquement le code à chaque commit, de vérifier que les tests passent et de déployer des versions stables du jeu. L’intégration continue garantit ainsi une qualité de code irréprochable tout au long du développement du projet.

## Installation

1. Clonez ce repository sur votre machine locale

2. Allez dans le répertoire du projet

3. Installez les dépendances :

```bash
npm install
```

## Lancer le projet

Pour démarrer le projet en mode développement, exécutez la commande suivante :

```bash
npm run dev
```

Le projet sera accessible à l'adresse [http://localhost:5173](http://localhost:5173).
