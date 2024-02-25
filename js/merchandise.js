function init() {
  let current = 0;
  let directionForward = true;
  const items = document.querySelectorAll(".card-slider .items .item");
  const nextBtn = document.querySelector(".card-slider .next");
  const prevBtn = document.querySelector(".card-slider .prev");

  const getCurrentItem = () => {
    return;
  };

  const getCard = (item) => {
    return item.querySelector(".card");
  };

  const getTitle = (item) => {
    return item.querySelector(".title span");
  };

  const setItems = () => {
    items.forEach((item, index) => {
      getTitle(item).innerHTML = getTitle(item).textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );

      if (index === current) return;

      anime.set(getCard(item), {
        translateX: "100vw",
      });

      anime.set(getTitle(item).querySelectorAll(".letter"), {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      });
    });

    anime.set(items[current], {
      translateX: 0,
      opacity: 1,
    });
  };

  const animate = {
    in(item) {
      const card = getCard(item);
      const title = getTitle(item);

      const tl = anime.timeline({
        duration: 1000,
        easing: "easeOutExpo",
      });

      tl.add({
        targets: card,
        //   opacity: [0, 1],
        translateX: directionForward ? ["100vw", 0] : ["-100vw", 0],
        rotate: [40, 0],
      }).add(
        {
          targets: title.querySelectorAll(".letter"),
          clipPath: [
            "polygon(0 0, 100% 0, 100% 0, 0 0)",
            "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ],
          translateY: directionForward ? ["1em", 0] : ["-1em", 0],
          delay: anime.stagger(40),
        },
        "-=1000"
      );

      return tl;
    },

    out(item) {
      const card = getCard(item);
      const title = getTitle(item);

      const tl = anime.timeline({
        duration: 1000,
        easing: "cubicBezier(0.86,0,0.07,1);",
      });

      tl.add({
        targets: card,
        //   opacity: [1, 0],
        translateX: directionForward ? [0, "-100vw"] : [0, "100vw"],
        rotate: [0, -40],
      }).add(
        {
          targets: title.querySelectorAll(".letter"),
          clipPath: [
            "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
            "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          ],
          translateY: directionForward ? [0, "-1em"] : [0, "1em"],
          delay: anime.stagger(40),
        },
        "-=1000"
      );

      return tl;
    },
  };

  function updateClasses() {
    items.forEach((item, index) => {
      if (index == current) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    });
  }
  function next() {
    if (!directionForward) {
      directionForward = !directionForward;
    }
    animate.out(items[current]);
    current = (current + 1) % items.length;
    setTimeout(function () {
      animate.in(items[current]);
    }, 500); // <-- Change the delay here
    updateClasses();
  }

  function prev() {
    if (directionForward) {
      directionForward = !directionForward;
    }
    animate.out(items[current]);
    current = (current - 1 + items.length) % items.length;
    setTimeout(function () {
      animate.in(items[current]);
    }, 500); // <-- Change the delay here
    updateClasses();
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  setItems();
}

document.addEventListener("DOMContentLoaded", init);