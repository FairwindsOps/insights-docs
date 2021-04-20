# Viewing the Results
The **Repositories** tab will show you a list of all repositories that have been connected to Insights.
Next to each repo, you can see the number of `danger` and `warning` items currently found in the main
branch.
<img :src="$withBase('/img/repos-list.png')" alt="List of all repos">

When you click on a particular repository, the first thing you'll see is a list of action items
affecting the main branch.
<img :src="$withBase('/img/repo-main-branch.png')" alt="Action items for the main branch">

Below that, you'll see a section for each branch, along with a list of action items that have
been created or fixed in that branch.

For example, here's a branch that creates some security issues in `passing.yaml`:
<img :src="$withBase('/img/repo-failing-branch.png')" alt="Action items for a failing branch">

And here's a branch that fixes some security issues in `failing.yaml`:
<img :src="$withBase('/img/repo-passing-branch.png')" alt="Fixed action items for a passing branch">


