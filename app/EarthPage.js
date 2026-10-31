'use client';
import { useEffect } from 'react';

export default function EarthPage() {

  useEffect(() => {
    // ── Popup ──────────────────────────────────────────────
    const contactBtn = document.getElementById('contactBtn');
    const popupOverlay = document.getElementById('popupOverlay');
    if (contactBtn && popupOverlay) {
      contactBtn.addEventListener('click', () => popupOverlay.classList.add('show'));
    }
    window.addEventListener('click', (e) => {
      if (popupOverlay && e.target === popupOverlay) popupOverlay.classList.remove('show');
    });

    // ── Wait for GSAP + ScrollSmoother then init ───────────
    let attempts = 0;
    const maxAttempts = 60; // wait up to 6 seconds

    const initGSAP = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      const ScrollSmoother = window.ScrollSmoother;

      if (!gsap || !ScrollTrigger || !ScrollSmoother) {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(initGSAP, 100);
        }
        return;
      }

      // Register plugins
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      // ── Horizontal scroll (caseVarticleScroll) ────────────
      const varticleEl = document.querySelector('.carticle-slide-active');
      if (varticleEl) {
        // Kill any existing ScrollSmoother instance first
        const existing = ScrollSmoother.get();
        if (existing) existing.kill();

        // Re-create ScrollSmoother on smooth-wrapper/content
        const smoother = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.5,
          effects: true,
        });

        const wrapper = document.querySelector('.scroller-wrapper');
        const scroller = wrapper ? wrapper.querySelector('.scroller') : null;

        if (wrapper && scroller) {
          const timelines = [];

          const getToValue = () =>
            scroller.scrollWidth - wrapper.getBoundingClientRect().width;

          const mm = gsap.matchMedia();

          mm.add('(min-width: 641px)', () => {
            // pre-pin
            const beforeST = gsap.fromTo(
              scroller,
              {
                x: () => {
                  const dist = scroller.getBoundingClientRect().top + window.scrollY;
                  return dist * 0.5;
                },
                opacity: 0.2,
              },
              {
                x: () => 0,
                opacity: 1,
                ease: 'none',
                immediateRender: true,
                scrollTrigger: {
                  trigger: scroller,
                  start: -10,
                  end: '50% 46.99%',
                  invalidateOnRefresh: true,
                  scrub: true,
                },
              }
            );
            timelines.push(beforeST);

            // pinned horizontal scroll
            const mainST = gsap.fromTo(
              scroller,
              { x: () => 0 },
              {
                x: () => -getToValue(),
                immediateRender: false,
                ease: 'none',
                scrollTrigger: {
                  trigger: scroller,
                  start: '50% 47%',
                  end: () =>
                    '+=' +
                    Math.min(
                      getToValue(),
                      Math.max(window.innerHeight, window.innerWidth) + 200
                    ),
                  pin: true,
                  invalidateOnRefresh: true,
                  scrub: true,
                },
              }
            );
            timelines.push(mainST);

            // post-pin fade out
            const afterST = gsap.fromTo(
              scroller,
              { x: () => -getToValue(), opacity: 1 },
              {
                x: () => -getToValue() - window.innerWidth * 0.5,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: scroller,
                  start: () => mainST.scrollTrigger.end,
                  end: () => '+=' + window.innerHeight * 0.75,
                  invalidateOnRefresh: true,
                  scrub: true,
                },
              }
            );
            timelines.push(afterST);

            return () => {
              timelines.forEach((tl) => tl.kill());
              timelines.length = 0;
              gsap.set([scroller, wrapper], { clearProps: 'all' });
            };
          });
        }
      }

      // ── Scrolling text marquee ────────────────────────────
      const scrollingTextOne = document.querySelector('.scrollingText');
      if (scrollingTextOne) {
        gsap.registerPlugin(ScrollTrigger);
        const tl2 = gsap.timeline();
        tl2.to('.scrollingText', { x: -1000, duration: 50, repeat: -1, ease: 'linear' });
        const tl = gsap.timeline();
        tl.to('.scrollingText', {
          xPercent: -5,
          scrollTrigger: { trigger: '.scrollingText', scrub: 1 },
        });
      }

      const scrollingTextTwo = document.querySelector('.scrollingText-two');
      if (scrollingTextTwo) {
        const tl2 = gsap.timeline();
        tl2.to('.scrollingText-two', { x: 1000, duration: 50, repeat: -1, ease: 'linear' });
        const tl = gsap.timeline();
        tl.to('.scrollingText-two', {
          xPercent: 5,
          scrollTrigger: { trigger: '.scrollingText-two', scrub: 1 },
        });
      }

      // ── Grow (scale) animation ────────────────────────────
      if (document.querySelector('.grow')) {
        const growTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.grow',
            scrub: 1,
            start: 'top center',
            end: '+=1000',
            ease: 'power1.out',
          },
        });
        growTl.to('.grow', { duration: 1, scale: 1 });
      }

      // ── Rolling text nav effect ───────────────────────────
      document.querySelectorAll('.rolling-text').forEach((element) => {
        const innerText = element.innerText;
        element.innerHTML = '';
        const textContainer = document.createElement('div');
        textContainer.classList.add('block');
        for (const letter of innerText) {
          const span = document.createElement('span');
          span.innerText = letter.trim() === '' ? '\xa0' : letter;
          span.classList.add('letter');
          textContainer.appendChild(span);
        }
        element.appendChild(textContainer);
        element.appendChild(textContainer.cloneNode(true));
      });

      // ── Counter up ────────────────────────────────────────
      if (window.$ && window.$.fn && window.$.fn.counterUp) {
        window.$('.counter').counterUp({ delay: 10, time: 1000 });
      }

      // ── Back to top scroll progress ───────────────────────
      if (window.$ && window.$.fn) {
        // handled by original main.js backToTopInit
      }
    };

    // Start polling
    setTimeout(initGSAP, 300);

    // Cleanup on unmount
    return () => {
      if (window.gsap && window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((t) => t.kill());
        const sm = window.ScrollSmoother && window.ScrollSmoother.get();
        if (sm) sm.kill();
      }
    };
  }, []);

  return (
    <>
      <style>{`
        .email-cta-wrapper{display:flex;justify-content:center;align-items:center;padding:20px;background-color:transparent;}
        .email-cta-container{display:flex;align-items:center;background-color:white;border-radius:50px;padding:5px 10px;box-shadow:0 4px 10px rgba(0,0,0,.1);max-width:700px;width:100%;}
        .email-cta-emoji{font-size:20px;margin-right:10px;}
        .email-cta-input{flex:1;padding:10px;border:none;border-radius:50px;outline:none;background-color:transparent;font-size:14px;}
        .email-cta-input::placeholder{color:#aaa;font-size:14px;}
        .email-cta-button{background-color:#4f6cff;color:white;border:none;border-radius:20px;padding:5px 15px;font-size:14px;cursor:pointer;transition:background-color .3s ease;}
        .email-cta-button:hover{background-color:#3655d6;}
        @media(max-width:768px){.email-cta-container{flex-direction:column;align-items:stretch;padding:15px;}.email-cta-input{margin-bottom:10px;}.email-cta-button{width:100%;}}
        .stats-section{display:flex;justify-content:space-between;align-items:center;background-color:black;padding:20px 5%;color:white;margin-top:-100px;font-family:Arial,sans-serif;text-align:center;flex-wrap:nowrap;overflow-x:auto;white-space:nowrap;gap:50px;}
        .stats-section::-webkit-scrollbar{display:none;}
        .stat-item{display:flex;flex-direction:column;align-items:center;min-width:150px;flex:1;}
        .stat-value{font-size:4.5rem;font-weight:bold;line-height:1.2;}
        .stat-label{font-size:1.3rem;margin-top:10px;text-transform:uppercase;color:#cccccc;}
        @media(max-width:1024px){.stats-section{gap:30px;}.stat-value{font-size:3.5rem;}.stat-label{font-size:1.1rem;}}
        @media(max-width:768px){.stats-section{justify-content:flex-start;padding:10px;margin-top:100px;overflow-x:auto;}.stat-item{min-width:120px;}.stat-value{font-size:2.5rem;}.stat-label{font-size:1rem;}}
        @media(max-width:480px){.stats-section{gap:5px;}.stat-item{min-width:100px;}.stat-value{font-size:1.5rem;}.stat-label{font-size:.9rem;}}
        .gradient-line{height:4px;width:100%;background:linear-gradient(90deg,#0000FF,#FFFFFF,#FF0000);margin:20px 0;border-radius:2px;}
        .list-container{display:flex;flex-wrap:wrap;gap:5px;justify-content:flex-start;padding:10px;background-color:transparent;}
        .list-item{background-color:#2c2c2c;color:white;padding:5px 10px;border-radius:8px;font-size:10px;cursor:pointer;flex:1 1 calc(50% - 20px);display:flex;justify-content:space-between;align-items:center;transition:background-color .3s ease,transform .3s ease;}
        .list-item:hover{background-color:#3f3f3f;transform:translateY(-3px);}
        @media(max-width:768px){.list-item{flex:1 1 100%;font-size:10px;}}
        @media(max-width:480px){.list-item{flex:1 1 100%;font-size:14px;}}
        .main-section{display:flex;justify-content:center;align-items:center;padding:20px;background-color:#000;}
        .gradient-content{max-width:800px;width:100%;padding:40px;background:linear-gradient(180deg,#1c1c1e,#000000 80%);border-radius:10px;text-align:justify;box-shadow:0px 4px 20px rgba(0,0,0,.5);}
        .gradient-content h2{font-size:5.5rem;font-weight:bold;text-align:left;margin-bottom:1.5rem;}
        .gradient-content p{font-size:2.8rem;line-height:1.8;text-align:justify;word-spacing:.1rem;}
        @media(max-width:768px){.gradient-content{padding:20px;}.gradient-content h2{font-size:3rem;}.gradient-content p{font-size:1.5rem;}}
        @media(max-width:480px){.gradient-content{padding:20px;}.gradient-content h2{font-size:2.8rem;}.gradient-content p{font-size:1.5rem;line-height:1.6;}}
        .main-gradient-section{background-color:#000;padding:40px;}
        .gradient-section{background:linear-gradient(135deg,#2D2F44,#1A1B28);color:#FFFFFF;padding:40px;border-radius:10px;line-height:1.8;max-width:1000px;margin:40px auto;text-align:left;box-shadow:0 4px 10px rgba(0,0,0,.25);}
        .gradient-section p{font-size:30px;margin:10px 0px;}
        @media(max-width:768px){.gradient-section{padding:15px;font-size:.9em;}}
        @media(max-width:480px){.gradient-section{padding:10px;font-size:.8em;}}
        .video-container{position:relative;overflow:hidden;border-radius:10px;width:100%;max-width:800px;margin:auto;cursor:pointer;aspect-ratio:16/9;transition:transform .5s ease;}
        .video-container:hover{transform:scale(1.55);}
        .video-content{width:100%;height:100%;object-fit:cover;pointer-events:none;}
        .popup-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.7);display:flex;justify-content:center;align-items:center;z-index:9999;opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;}
        .popup-overlay.show{opacity:1;visibility:visible;}
        @keyframes fadeIn{from{transform:scale(.95);opacity:0;}to{transform:scale(1);opacity:1;}}
        .footer-top-one{display:flex;flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,0.1);margin-bottom:40px;}
        .footer-top-one .logo-area{flex-shrink:0;}
        .footer-top-one .footer-nav ul{display:flex;flex-direction:row;list-style:none;gap:24px;margin:0;padding:0;}
        .footer-top-one .footer-nav ul li a{color:#ccc;text-decoration:none;font-size:14px;transition:color .3s;}
        .footer-top-one .footer-nav ul li a:hover{color:#fff;}
        .footer-top-one .social-area ul{display:flex;flex-direction:row;list-style:none;gap:16px;margin:0;padding:0;}
        .footer-top-one .social-area ul li a{color:#ccc;font-size:16px;transition:color .3s;}
        .footer-top-one .social-area ul li a:hover{color:#fff;}
        @media(max-width:768px){.footer-top-one{flex-direction:column;align-items:flex-start;}.footer-top-one .footer-nav ul{flex-wrap:wrap;gap:16px;}.footer-top-one .social-area ul{gap:12px;}}
      `}</style>

      {/* POPUP */}
      <div id="popupOverlay" className="popup-overlay"></div>

      {/* HEADER */}
      <header className="header-area header-one header--sticky">
        <div className="header-container-one">
          <div className="header-wrapper">
            <a href="/" className="logo" style={{ width: '200px' }}>
              <img src="/logo.webp" alt="The Earth Production" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
            </a>
            <div className="header-right">
              <nav className="nav-area drop-down-rts">
                <ul className="navbar-nav-1">
                  <li className="menu-item main-nav-on"><a className="menu-link" href="#services"><span className="rolling-text">Services</span></a></li>
                  <li className="menu-item main-nav-on"><a className="menu-link" href="#portfolio"><span className="rolling-text">Portfolio</span></a></li>
                  <li className="menu-item main-nav-on"><a className="menu-link" href="#contact" id="contactBtn"><span className="rolling-text">Contact</span></a></li>
                </ul>
              </nav>
              <div className="action-area">
                <div className="menu-btn">
                  <div className="rts-offcanvas-wrapper">
                    <div className="container-menu">
                      <div className="action-menu">
                        <div className="close-event"></div>
                        <div className="open-event">
                          <div className="text"></div>
                          <div className="burger">
                            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-close"><line x1="13.788" y1="1.28816" x2="1.06011" y2="14.0161" stroke="currentColor" strokeWidth="1.2"></line><line x1="1.06049" y1="1.43963" x2="13.7884" y2="14.1675" stroke="currentColor" strokeWidth="1.2"></line></svg>
                            <svg viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-burger"><line x1="18" y1="0.6" y2="0.6" stroke="currentColor" strokeWidth="1.2"></line><line x1="18" y1="5.7167" y2="5.7167" stroke="currentColor" strokeWidth="1.2"></line><line x1="18" y1="10.8334" y2="10.8334" stroke="currentColor" strokeWidth="1.2"></line></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rts-fs-menu">
                      <div className="rts-fs-container row">
                        <div className="rts-fs--nav col-12 col-md-6">
                          <ul id="primary-menu" className="navbar-nav-button">
                            <li className="menu-item"><a href="/">Home</a></li>
                            <li className="menu-item"><a href="#services">Services</a></li>
                            <li className="menu-item"><a href="#portfolio">Portfolio</a></li>
                            <li className="menu-item"><a href="#contact">Contact</a></li>
                          </ul>
                        </div>
                        <div className="rts-fs--contacts col-12 col-md-6">
                          <div className="contact-inner">
                            <div className="contact-information">
                              <h2 className="heading-title">Our Studio</h2>
                              <div className="address"><ul><li><p>Indore, Madhya Pradesh (India)</p></li></ul></div>
                            </div>
                            <div className="contact-information">
                              <h2 className="heading-title">Get In Touch</h2>
                              <div className="contact"><ul>
                                <li><a href="mailto:hello@theearthproduction.com" className="mail">hello@theearthproduction.com</a></li>
                                <li><a href="tel:+917049407951" className="number">+91 7049407951</a></li>
                              </ul></div>
                              <div className="rts-social-area-one"><ul>
                                <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-whatsapp"></i></a></li>
                              </ul></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="smooth-wrapper">
        <div id="smooth-content">

          {/* HERO */}
          <div className="banner-area banner-style-one banner-bg-1 hero__area-3 banner__jump" style={{ paddingBottom: '100px' }}>
            <div className="shape-image"><img src="/assets/images/banner/06.png" alt="banner" /></div>
            <div className="top-center-image rts-scroll-down-circle-wrapper-3">
              <a href="#portfolio" className="speen-shape scroll-down-circle-3">
                <svg className="uni-circle-text-path uk-text-secondary uni-animation-spin" viewBox="0 0 100 100" width="180" height="180">
                  <defs><path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"></path></defs>
                </svg>
              </a>
            </div>
            <div className="container">
              <div className="row ptb--200 ptb_sm--150">
                <div className="col-lg-9">
                  <div className="banner-one-wrapper mt--80 mt_sm--0">
                    <h2 className="title rts_hero__title">
                      Your Story Deserves <br />Professional <br />Sound &amp; Vision.
                    </h2>
                    <div className="para-wraph" style={{ marginTop: '100px' }}>
                      <p className="disc hero__sub-title">
                        Looking for a world-class Podcast or Video Studio? <br />
                        The Earth Production — it&apos;s more than just recording!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br /><br />
            <div className="stats-section">
              <div className="stat-item"><span className="stat-value">500+</span><span className="stat-label">Episodes <br /> Recorded</span></div>
              <div className="stat-item"><span className="stat-value">200+</span><span className="stat-label">Happy <br /> Clients</span></div>
              <div className="stat-item"><span className="stat-value">4K</span><span className="stat-label">Video <br /> Quality</span></div>
              <div className="stat-item"><span className="stat-value">98%</span><span className="stat-label">Client <br /> Satisfaction</span></div>
            </div>
            <div className="gradient-line"></div>
            <br /><br />
          </div>

          <br /><br />

          {/* VIDEO */}
          <div className="video-container">
            <video className="video-content" autoPlay muted loop playsInline>
              <source src="/assets/images/logo/9x intemails_01_1 upda (1).mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* SCROLLING TEXT */}
          <div className="rts-about-area-1 rts-section-gapBottom">
            <div className="container-full">
              <div className="row"><div className="col-lg-12"><div className="grid-lines-wrapper"><div className="grid-lines"><div className="grid-line"></div><div className="grid-line"></div><div className="grid-line"></div><div className="grid-line"></div></div></div></div></div>
              <div className="text-split-wrap-about scrolltext-wrapper">
                <div className="text-split scrollingText-two">
                  <h2 className="title">
                    Podcast &amp; Video Studio Solutions <span>for Your Brand</span> &nbsp; Podcast &amp; Video Studio Solutions <span>for Your Brand</span> &nbsp; Podcast &amp; Video Studio Solutions <span>for Your Brand</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <div id="services" className="our-approch-area-style-one rts-section-gap bg-dark-1">
            <div className="container">
              <div className="row"><div className="col-lg-12"><div className="grid-lines-wrapper"><div className="grid-lines"><div className="grid-line"></div><div className="grid-line"></div><div className="grid-line"></div><div className="grid-line"></div></div></div></div></div>
              <div className="row">
                <div className="col-lg-6 col-md-6 rts-slide-right-gsap">
                  <div className="approch-area-left">
                    <div className="title-area-left-wrapper">
                      <span className="pre-title">Services</span>
                      <h2 className="title quote">Our Services<br /></h2>
                    </div>
                    <p className="disc rts-text-anim">Everything you need to record, produce, and grow your podcast or video content.</p>
                    <a href="#contact" className="learn-more-btn">Book Now <i className="fa-solid fa-arrow-up-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 rts-slide-left-gsap mt_sm--30">
                  <div className="single-approach-area-start">
                    <div className="left-area">
                      <h3 className="title">Podcast Recording Studio</h3>
                      <div className="list-container">
                        <div className="list-item">Soundproofed Recording Rooms</div>
                        <div className="list-item">Professional Microphones (Shure SM7B, Rode NT1)</div>
                        <div className="list-item">Multi-Guest Setup (up to 4 mics)</div>
                        <div className="list-item">Real-Time Audio Monitoring</div>
                        <div className="list-item">Live Streaming Ready</div>
                        <div className="list-item">Hourly &amp; Full-Day Rental</div>
                      </div>
                    </div>
                  </div>
                  <div className="single-approach-area-start two">
                    <div className="left-area">
                      <h3 className="title">Video Editing &amp; Production</h3>
                      <div className="list-container">
                        <div className="list-item">4K Video Editing</div>
                        <div className="list-item">Color Grading &amp; Correction</div>
                        <div className="list-item">Motion Graphics &amp; Titles</div>
                        <div className="list-item">Podcast Video Cuts for YouTube</div>
                        <div className="list-item">Short-Form Reels &amp; Shorts</div>
                        <div className="list-item">Thumbnail Design</div>
                        <div className="list-item">Sound Design &amp; Music</div>
                        <div className="list-item">Brand Intro / Outro</div>
                      </div>
                    </div>
                  </div>
                  <div className="single-approach-area-start three mb--0">
                    <div className="left-area">
                      <h3 className="title">Other Studio Services</h3>
                      <div className="list-container">
                        <div className="list-item">Audio Mixing &amp; Mastering</div>
                        <div className="list-item">Studio Photography</div>
                        <div className="list-item">Podcast Distribution Setup</div>
                        <div className="list-item">Podcast Strategy Consulting</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LETTER SECTION */}
          <div className="main-section">
            <div className="gradient-content">
              <h2>Dear Creator <br /> &amp; Podcaster,</h2>
              <p><span style={{ fontWeight: 'bold', color: 'white' }}>Starting a podcast? </span><br />It feels like a real mind grind,<br />Keeps you up late, got peace to find.<br />Audio bad? Video blurry and dry?<br />Content stuck? Your reach won&apos;t fly?</p>
              <p>We know those nights with eyes wide awake,<br />Thinking,<br />&quot;What&apos;s the next big move to make?&quot;</p>
              <p><span style={{ fontWeight: 'bold', color: 'white' }}>Thinking </span><br />&quot;Should I record at home or rent a studio?&quot;<br />Should I edit myself? Hire someone? What to do?<br />Errrrbody&apos;s talkin&apos; bout gear and trends,</p>
              <p><span style={{ fontWeight: 'bold', color: 'white' }}>&quot;Buy that mic; </span><br />It&apos;s the latest blend.&quot;<br />&quot;Drop $2k on a camera, make it pop!&quot;<br />Post every day on YouTube—never let it stop.<br /></p>
              <p>Creators get caught in a gear mess,</p>
              <p><span style={{ fontWeight: 'bold', color: 'white' }}>A sprinkle of </span><br />&quot;I&apos;ll do it all,&quot; nothing but stress.<br />A little of this, a smidge of that,<br />Congrats, you&apos;ve built… an echo chamber, STAT<br /></p>
              <p>We&apos;d rather rub ghost peppers in our eyes<br />Than see great stories lost behind poor tries<br />But this ain&apos;t about us<br /></p>
              <p><span style={{ fontWeight: 'bold', color: 'white' }}>—it&apos;s about YOU, </span><br />Reading this &apos;cause your content ain&apos;t quite true.<br /></p>
              <p>Maybe you&apos;re stuck, maybe you soar<br />But if you want more, we know the numbers<br />More reach, more listeners, more brand to make,<br />More episodes and stories for your audience to take.</p>
              <p><span style={{ fontWeight: 'bold', color: 'white' }}>So, hey,</span><br />what&apos;s the point if the views are high,<br />But your audio sounds bad — pie in the sky?<br />Let&apos;s fix the sound, let&apos;s grow the dream,<br />Together, we&apos;ll build your winning stream.</p>
            </div>
          </div>

          {/* GRADIENT QUOTE */}
          <div className="main-gradient-section">
            <div className="gradient-section">
              <p style={{ color: 'white' }}>Another day, another &quot;record at home&quot; on repeat, &quot;We&apos;re the best—our mics can&apos;t be beat!&quot;</p><br />
              <p style={{ color: 'white' }}>&quot;Home studio is fine, your audio will soar, We&apos;ll add some filters, sound galore!&quot;</p><br />
              <p style={{ color: 'white' }}>But aren&apos;t you tired of mediocre quality? All talk, no proof—just bad audio realities.</p><br />
              <p style={{ color: 'white' }}>Let&apos;s get real, no smoke, no show, We deal in crystal-clear sound that makes your audience grow.</p>
            </div>
          </div>

          {/* SERVICE CARDS (list style) */}
          <div className="rts-section-gap rts-service-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="title-area"><span className="sub-title">Our STUDIO</span></div>
                  <div className="title-top-service-varticle">
                    <h2 className="title">As a podcast &amp; <br />production studio</h2>
                    <p className="dsic">Let&apos;s make your podcast so good, it sets the airwaves on fire.</p>
                    <a href="#contact" className="learn-more-btn">Book a Session<i className="fa-solid fa-arrow-up-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="service-area-one-main-wrapper">
                    {[
                      { img: '15.jpg', title: 'Professional Recording', desc: 'Studio-grade microphones and acoustically treated rooms for perfect sound.' },
                      { img: '60.jpg', title: '4K Video Editing', desc: 'Full post-production: color grading, motion graphics, and platform-ready exports.' },
                      { img: '61.jpg', title: 'Rental Studio', desc: 'Hourly or full-day studio rental with all equipment included. Just bring your ideas.' },
                      { img: '62.jpg', title: 'Viral Short-Form Clips', desc: 'Cut your podcast into viral Reels, Shorts & TikTok content to maximize reach.' },
                      { img: '63.jpg', title: 'Audio Post-Production', desc: 'Professional mixing, mastering, noise removal & EQ for broadcast-quality sound.' },
                    ].map((svc) => (
                      <div className="single-item-service-one" key={svc.title}>
                        <a href="#contact">
                          <div className="rts-img-contaciner"><figure className="list-img"><img className="list-img" src={`/assets/images/product/${svc.img}`} alt={svc.title} /></figure></div>
                          <div className="list-title col-md-6"><h3>{svc.title}</h3></div>
                          <div className="list-info col-md-3"><p className="disc">{svc.desc}</p></div>
                          <div className="button-area">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.67 384.67"><g><path fillRule="evenodd" d="M0 45.26l276.05 276.05H22.63v63.36h362.04V22.63h-63.36v253.42L45.26 0 0 45.26z"></path></g></svg>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PORTFOLIO / CASE STUDIES */}
          <div id="portfolio" className="rts-use-case-area-one rts-section-gap bg-dark-1">
            <div className="container-full">
              <div className="col-lg-12">
                <div className="main-wrapper-case-studies scrolltext-wrapper">
                  <div className="scrollingText">
                    <h2 className="title">our <span>Work</span> . our <span>Work</span> . our <span>Work</span> . our <span>Work</span> .</h2>
                  </div>
                </div>
              </div>
            </div>
            <main className="carticle-slide-active">
              <div className="scroller-wrapper">
                <div className="scroller">
                  {[
                    { title: "The Founder's Mic Podcast —\n40+ Episodes Produced,\n15K Monthly Listeners.", desc: "Full podcast production — recording, editing, and distribution for a startup founders show.", img: 'ad6.svg' },
                    { title: "Brand Story Film —\nCinematic Documentary\n2M+ Views Online", desc: "Full video production with 4K cameras, color grading, motion graphics and original music.", img: 'BEST OF BOTH WORLDS   AUGUST 9TH !.svg' },
                    { title: "Viral Short-Form Series —\n60 Clips from 8 Episodes\n3.5M Combined Views!", desc: "Transformed long-form podcast episodes into viral short-form content across all platforms.", img: 'Screenshot 2024-12-09 at 23.09.08.svg' },
                    { title: "The Health Decoded Show —\nMonthly Wellness Podcast\n8K Subscribers & Growing!", desc: "End-to-end podcast production — recording, editing, thumbnails, and monthly distribution.", img: 'Screenshot 2024-12-10 at 01.31.57.svg' },
                  ].map((slide, i) => (
                    <div className="slide" key={i}>
                      <div className="container-full-150 mt--110 mt_md--50 mt_sm--30">
                        <div className="flot-right-150">
                          <div className="use-case-area-start">
                            <div className="content-wrapper">
                              <span className="sub-title">Our Project</span>
                              <h2 className="title" style={{ fontSize: '25px' }}>{slide.title.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}</h2>
                              <br /><br />
                              <p>{slide.desc}</p>
                              <a href="#contact" className="learn-more-btn">BOOK SESSION <i className="fa-solid fa-arrow-up-right"></i></a>
                            </div>
                            <a href="#contact" className="img-wrapper">
                              <img className="images" src={`/assets/images/icons/${slide.img}`} alt={slide.title} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>

          {/* COUNTER */}
          <div className="large-image-option-start rts-section-gap bg-dark-1 position-relative rts_jump_counter__animation">
            <div className="container">
              <div className="row"><div className="col-lg-12"><div className="grid-lines-wrapper"><div className="grid-lines"><div className="grid-line"></div><div className="grid-line"></div><div className="grid-line"></div><div className="grid-line"></div></div></div></div></div>
              <div className="row"><div className="col-lg-12"><div className="title-area-inner large-image"><h2 className="title quote">Studio Expertise In <br /> <span>Professional Production.</span></h2></div></div></div>
            </div>
            <div className="container-160">
              <div className="row"><div className="col-lg-12">
                <div className="large-video-playing grow">
                  <video autoPlay muted loop playsInline preload="metadata">
                    <source src="/assets/images/logo/Ninexfold-logo_dec_01.mp4" type="video/mp4" />
                  </video>
                </div>
              </div></div>
            </div>
            <div className="container mt--120">
              <div className="row"><div className="col-lg-12">
                <div className="counter-up-wrapper counter_animation">
                  {[['500', '+', 'Episodes\nRecorded'], ['200', '+', 'Happy\nClients'], ['4', 'K', 'Video\nQuality'], ['98', '%', 'Client\nSatisfaction']].map(([n, s, l], i) => (
                    <div className="counter-single counter__anim" key={i}>
                      <div className="inner">
                        <h2 className="title"><span className="counter">{n}</span>{s}</h2>
                        <p>{l.split('\n').map((line, j) => <span key={j}>{line}{j === 0 && <br />}</span>)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div></div>
            </div>
          </div>

          {/* FOOTER */}
          <div id="contact" className="rts-footer-area footer-one rts-section-gap bg-dark-1">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="footer-top-one">
                    <div className="logo-area">
                      <a href="/"><img src="/logo.webp" alt="The Earth Production" style={{ height: '70px', width: 'auto' }} /></a>
                    </div>
                    <div className="footer-nav">
                      <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#portfolio">Portfolio</a></li>
                        <li><a href="#contact">Contact</a></li>
                      </ul>
                    </div>
                    <div className="social-area">
                      <ul>
                        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-whatsapp"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt--60">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-widget">
                    <h3 className="title">The Earth Production</h3>
                    <p className="disc">Indore&apos;s premier Podcast &amp; Video Production Studio. Built for creators, brands, and storytellers who refuse to settle for less.</p>
                    <div className="contact-area mt--30">
                      <p><i className="fa-solid fa-location-dot"></i> Indore, Madhya Pradesh, India</p>
                      <p><i className="fa-solid fa-phone"></i> <a href="tel:+917049407951">+91 7049407951</a></p>
                      <p><i className="fa-solid fa-envelope"></i> <a href="mailto:hello@theearthproduction.com">hello@theearthproduction.com</a></p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer-widget">
                    <h3 className="title">Our Services</h3>
                    <ul className="footer-list">
                      <li><a href="#services">Podcast Recording</a></li>
                      <li><a href="#services">Video Editing</a></li>
                      <li><a href="#services">Studio Rental</a></li>
                      <li><a href="#services">Social Media Clips</a></li>
                      <li><a href="#services">Audio Mastering</a></li>
                      <li><a href="#services">Content Photography</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer-widget">
                    <h3 className="title">Book a Session</h3>
                    <p className="disc">Ready to record your next episode or produce your next video? Let&apos;s build something great together.</p>
                    <a href="mailto:hello@theearthproduction.com" className="rts-btn btn-primary mt--30">Contact Us <i className="fa-solid fa-arrow-up-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="footer-bottom-one">
                    <p className="disc">© 2025 The Earth Production. All Rights Reserved. | Indore, India 🇮🇳</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-noise"></div>
      <div className="progress-wrap">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
        </svg>
      </div>
      <div className="rts-cursor cursor-outer" data-default="yes" data-link="yes" data-slider="no"><span className="fn-cursor"></span></div>
      <div className="rts-cursor cursor-inner" data-default="yes" data-link="yes" data-slider="no"><span className="fn-cursor"><span className="fn-left"></span><span className="fn-right"></span></span></div>
      <div className="modal-sidebar-scroll rts-dark-light">
        <ul>
          <li className="go-dark-w"><span>Dark</span><i className="rts-go-dark fal fa-moon"></i></li>
          <li className="go-light-w"><span>Light</span><i className="rts-go-light fa-light fa-brightness"></i></li>
        </ul>
      </div>
    </>
  );
}
