import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

//Ressources graphiques
import Deliveroo from "./Deliveroo_logo.svg";

//import des Composants
import Restaurant from "./Components/Restaurant";

function App() {
  // Création des états
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState({});

  console.log("Render !");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://deliveroo-backend-project-v1.herokuapp.com/"
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    console.log("useEffect est déclenchée...");

    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    // Code de la page
    <div className="container">
      <div className="header">
        <img src={Deliveroo} alt="logo-deliveroo" />
      </div>
      <main>
        <Restaurant
          name={data.restaurant.name}
          description={data.restaurant.description}
          picture={data.restaurant.picture}
        />
        <>
          {data.categories.map((mealType, index) => {
            return (
              <div className="mealPropositions">
                <h2 key={index}>{mealType.name}</h2>;
                <>
                  {categories.meals.map((mealOffers, index) => {
                    // console.log("test");
                    // const { id, title, description, price } = meals;
                    return (
                      <div className="mealOffer">
                        <h3 key={index}>{mealOffers.title}</h3>
                      </div>
                    );
                  })}
                </>
              </div>
            );
          })}
        </>
      </main>
    </div>
  );
}

export default App;
