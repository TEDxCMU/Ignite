# TEDxCMU <Event Name>

## Setting up the repo

1. Create a new repo using this template:

    ![image](https://user-images.githubusercontent.com/50491000/215652455-b4474042-10e8-4c24-962c-2bf6d1aef9d9.png)
2. `git clone https://github.com/TEDxCMU/<your-new-repo>.git`
3. Change all instances of <Event Name> or event-name to your desired event name.
4. Set up a project in Prismic (login info [here](https://docs.google.com/document/d/1wWB2k3ItX8QhWLZKal3d2U8skcr0At8sC_868oAkpKo/edit?usp=share_link)). You can reference the types used in previous Primsic projects.
5. Generate a permanent access token in Settings > API & Security > Permanent access tokens, and replace the `<your access token>` in `src/utils/content.js` with it.
6. Update the endpoint in `src/utils/content.js` with the corresponding endpoint from your Prismic project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software:

```
Node.js
npm
```

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository:

```bash
git clone https://github.com/TEDxCMU/<Event Name>.git
```

2. Enter the directory and install the necessary packages:

```bash
cd <Event Name>
npm install
```

3. Start the development server and open [http://localhost:3000](http://localhost:3000) with your browser to see the result:

```bash
npm run dev
```
