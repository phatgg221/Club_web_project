import "../css/Hero.css"
function Hero() {
  return (
    <div class="hero">
      <div class="hero-text">
        <h1>Greetings, User!</h1>
        <p>
          Welcome to the largest (probably) competition database in Vietnam.
        </p>
        <div class="button-container">
          <button id="button1">Explore Competition</button>
          <button id="button2">Prepare for Competiton</button>
          <button id="button3">Book a counter-pitching session</button>
        </div>
      </div>
      <div class="image">
        <img src="/Mascott.png" alt="GFCC Logo"></img>
      </div>
    </div>
  );
}

export default Hero;
