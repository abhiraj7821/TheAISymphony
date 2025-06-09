import React, { useState,useRef, useEffect } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import fetchingImageUrl from './controllers/fetchingImageUrl';
gsap.registerPlugin(useGSAP);

function App() {

  // IMAGE
  const [imageUrl, setImageUrl] = useState("https://res.cloudinary.com/dxyq5mzfo/image/upload/v1749289830/OpenAI_Playground_2025-06-07_at_15.18.57_iboqjm.png");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  // Only 2 calls posible
  const [calls,setCalls] = useState(0);

  const [placeholder1, setplaceholder1] = useState("A Panda");
  const [placeholder2, setplaceholder2] = useState("Red");

  // FORM INPUT VALUES:
  const [something, setsomething] = useState("")
  const [color, setcolor] = useState("")
  const [buttonText,setButtonText] = useState("Write a prompt")

  const buttonRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);


  const bg_div = useRef();


  useEffect(()=>{
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const bgDiv = document.querySelector(".main");
        bgDiv.style.backgroundImage = `url('${imageUrl}')`;
        gsap.fromTo(
          bgDiv,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" }
        );
      };


      const handleClickOutside = (e) => {
      if (
         !buttonRef.current.contains(e.target) &&
          !inputRef1.current.contains(e.target) &&
          !inputRef2.current.contains(e.target)
        ) {
            console.log("CLICKED OUTSIDE");
            setIsDisabled(true);
            // Set Placeholder
            // setplaceholder1(something);
            // setplaceholder2(color);
            // Set button text
            setButtonText("Write a prompt")
            gsap.fromTo(
                  ".prompt",
                  { opacity: 0 },
                  { opacity: 1, duration: 1, ease: "power2.out" }
            );
            gsap.to(".main",{
              opacity:1
            });
             
          }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
  },[imageUrl])

  

  useGSAP(()=>{
    const tl = gsap.timeline();

    tl.from(".mov_text_center",{
      opacity:0,
      duration:1,
      y:10,
      ease:'power2.in'
    });
    tl.from(".mov_text_edge",{
      opacity:0,
      duration:1,
      y:10,
      ease:'power2.in'
    });
    tl.from([".prompt",".prompt_item"],{
      opacity:0,
      duration:1,
      y:10,
      ease:'power2.in'
    });
    tl.from(".button",{
      x:"-10%",
      opacity:0,
      duration:1,
      ease:'power2.inOut'
    });
    tl.from(".about",{
      opacity:0,
      duration:1,
      ease:'power2.in'
    })
  })


  const generateImage = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const url = await fetchingImageUrl(something,color);
      setImageUrl(url);
    } catch (err) {
      setError('Failed to generate image');
      console.error(err);
    } finally {
      setIsLoading(false);
      setButtonText("Write a prompt");
      setplaceholder1(something);
      setplaceholder2(color);
      setsomething("")
      setcolor("")
    }
  };


  const fakeFetch = () => {
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      console.log("Fake data fetched successfully!");
      setIsLoading(false);
      setplaceholder1(something);
      setplaceholder2(color);
      setsomething("")
      setcolor("")
    }, 5000); // 2 seconds delay
  };

  const formSubmitHandler = async (e)=>{
    e.preventDefault();

    if(calls>2){
      setButtonText("Only 2 calls Available")
    }

    if (!something.trim() || !color.trim()) {
      console.log("Please fill the input before submitting.");
      return;
    }

    console.log("Something = ",something,"Color = ",color);
    console.log("Form Submitted. ");

    // API CALL -> NEW IMAGE URL IS SET
    generateImage();
    // fakeFetch();

    // WHEN WE SUCCESSFULLY GET IMAGE URL FROM BACKEND
  }

  const buttonHandler = (e)=>{

    setButtonText("Run prompt")
    setIsDisabled(false);
    setplaceholder1("Something");
    setplaceholder2("Color");
    gsap.fromTo(
          ".prompt",
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" }
    );
    gsap.to(".main",{
      opacity:0.5
    });
  }


  return (
    <div>
      <div ref={bg_div}  className={`main flex flex-col justify-between h-screen w-screen bg-cover bg-center bg-no-repeat text-white bg-[url(${imageUrl})]`} >
        <div className="nav text-[1.2vw] flex justify-between p-[3vw]">
          <div className="mov_text_edge font-[imp]">Magnane</div>
          <div className="mov_text_center font-[imp] flex items-center flex-col leading-4">The AI <span className='font-[bookc]'>SYMPHONY</span></div>
          <div className="mov_text_edge font-[imp] ">cher ami</div>
        </div>

        <div className="bottom flex justify-between p-[5vw] uppercase text-[1vw] font-[imp] relative">

          <div className="prompt uppercase tracking-widest leading-5">
          {/* PROMPT SUBMITION */}
            <form action="" method='post' onSubmit={formSubmitHandler}
            className='text-[2.5vw]'>
              <div className=''>
                <label htmlFor="something"></label>
                <input type="text" name="something" placeholder={placeholder1} id="something" value={something} disabled={isDisabled} ref={inputRef1} onChange={(e)=>{setsomething(e.target.value)}} autoComplete='off' className='prompt uppercase font-[bookc] text-[4vw] border-none outline-none focus:outline-none bg-transparent'/>
              </div>
              <span className='prompt_item'>Wearing A</span>
              <div>
                <label htmlFor="color"></label>
                <input type="text" name="color" id="" placeholder={placeholder2} value={color} disabled={isDisabled} ref={inputRef2} onChange={(e)=>{setcolor(e.target.value)}} autoComplete='off' className='prompt uppercase font-[bookc] text-[4vw] border-none outline-none focus:outline-none bg-transparent' />
              </div>
              <span  className='prompt_item'>Puffer Jacket</span>
              <div className="submit flex justify-start mt-[2vw]">
                {isLoading ? (
                    <div className="flex justify-center items-center bottom-0 ">
                      <svg
                        className="animate-spin-slow w-10 h-10 "
                        viewBox="0 0 50 50"
                        fill="none"
                      >
                        <circle
                          cx="25"
                          cy="25"
                          r="20"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-dasharray="100"
                          stroke-dashoffset="75"
                        />
                      </svg>
                      <span className='text-[1vw] pl-5'>Your prompt is analyzed...</span>
                  </div>
                ) : (
                  <button  ref={buttonRef} onClick={buttonHandler} className='button font-[bookc] px-[6vw] py-[1vw] text-[1.2vw] rounded-[0.4rem] cursor-pointer bg-white/50 mt-[2rem]'>{buttonText}</button> 
                )}
              </div>
            </form>
          {/* ------------------------------------------------------ */}
          </div>

          <a href="http://abhishekrajput.in/" target='_blank' className="about hover:bg-white hover:text-black hover:transition-all hover:ease-in-out hover:duration-200 h-[6vw] font-[bookc] w-[6vw] bg-gray-400/50 rounded-full flex items-center justify-center absolute right-20 bottom-20" >about</a>
        </div>

      </div>
    </div>
  )
}

export default App
