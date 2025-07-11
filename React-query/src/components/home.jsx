import { useState } from "react";
import { Cat, Sparkles, RefreshCw, Heart } from "lucide-react";
import '../CatFactGenerator.css'; // Import the CSS file
import { useQuery } from "@tanstack/react-query";

import Axios from "axios";

function Home() {
  const [catMood, setCatMood] = useState("happy");


  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cat"],
    queryFn: async () => {
      return await Axios.get("https://catfact.ninja/fact").then(
        (res) => res.data
      );
    },
    refetchOnWindowFocus: false,
  });


  return (
    <div className="cat-fact-container">
      {/* Floating paw prints */}
      <div className="floating-paws">
        <div className="paw-print paw-print-1">🐾</div>
        <div className="paw-print paw-print-2">🐾</div>
        <div className="paw-print paw-print-3">🐾</div>
        <div className="paw-print paw-print-4">🐾</div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-title">
            <Cat className="header-icon header-icon-left" />
            <h1>Purrfect Cat Facts</h1>
            <Cat className="header-icon header-icon-right" />
          </div>
          <p className="header-subtitle">
            Discover amazing facts about our feline friends! 🐱
          </p>
        </div>

        {/* Cat illustration */}
        <div className="cat-illustration">
          <div className={`cat-emoji ${catMood}`}>
            {catMood === "excited" ? "😸" : "😺"}
          </div>
        </div>

        {/* Fact display */}
        <div className="fact-card">
          {isLoading ? (
            <div className="loading-content">
              <div className="loading-icons">
                <RefreshCw className="loading-spinner" />
                <span className="loading-paw">🐾</span>
              </div>
              <h2 className="loading-text">
                Fetching a purrfect fact for you...
              </h2>
            </div>
          ) : (
            <div className="fact-content">
              <div className="fact-icons">
                <Sparkles className="sparkle" />
                <span className="book-emoji">📚</span>
                <Sparkles className="sparkle" />
              </div>
              <p className="fact-text">
                {data?.fact}
              </p>
            </div>
          )}
        </div>

        {/* Generate button */}
        <button
          onClick={refetch}
          disabled={isLoading}
          className="generate-button"
        >
          {isLoading ? (
            <>
              <RefreshCw className="button-icon button-spinner" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Heart className="button-icon button-heart" />
              <span>Generate New Cat Fact</span>
              <span className="button-cat">🐱</span>
            </>
          )}
        </button>

        {/* Fun decorative elements */}
        <div className="decorative-elements">
          <div className="decorative-item">
            <span className="decorative-emoji">🧶</span>
            <span className="decorative-text">Yarn Ball of Knowledge</span>
          </div>
          <div className="decorative-item">
            <span className="decorative-emoji decorative-emoji-2">🐾</span>
            <span className="decorative-text">Paw-some Facts</span>
          </div>
          <div className="decorative-item">
            <span className="decorative-emoji decorative-emoji-3">🏠</span>
            <span className="decorative-text">Cat Wisdom</span>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="bottom-decoration"></div>
      
      {/* Floating hearts */}
      <div className="floating-hearts heart-1">
        <Heart />
      </div>
      <div className="floating-hearts heart-2">
        <Heart />
      </div>
      <div className="floating-hearts heart-3">
        <Heart />
      </div>
    </div>
  );
}

export default Home;