document.addEventListener("DOMContentLoaded", function () {
  console.log("The DOM has loaded");

  // Add links to product cards (div elements)
  const cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    cardnames = ["wobbler", "clownfish-minnow", "small-boi"];
    cards[i].addEventListener("click", () => {
      const currentUrl = window.location.pathname;
      window.location.replace(
        currentUrl.replace("/pood.html", `/toode/${cardnames[i]}.html`)
      );
      let parentDir = currentPath;
      console.log(parentDir);
    });
  }
});
