gsap.to(".cart-item", {
    duration: 1,
    scale: 0.1,
    y: 40,
    ease: "power1.inOut",
    stagger: {
      grid: [7,15],
      from: "end",
      amount: 1.5
    }
});