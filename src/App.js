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

  const [counter, setCounter] = useState(0);

  const [panier, setPanier] = useState([]);

  const minusSign = () => {
    const newCounter = [...counter];
    newCounter.push(0);
    setCounter(newCounter - 1);
  };

  const addSign = () => {
    const newCounter = [...counter];
    newCounter.push(0);
    setCounter(newCounter + 1);
  };

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
    <div className="body">
      <div className="header">
        <div className="border-logo">
          <img src={Deliveroo} alt="logo-deliveroo" />
        </div>
        <Restaurant
          name={data.restaurant.name}
          description={data.restaurant.description}
          picture={data.restaurant.picture}
        />
      </div>

      <div className="container">
        <main>
          <div className="restaurantOffers-section">
            <div div className="restaurantOffers">
              {data.categories.map((mealType, index) => {
                return (
                  <div className="mealPropositions">
                    <h2 key={index}>{mealType.name}</h2>
                    <div className="meal-bloc">
                      {mealType.meals.map((mealOffers, index) => {
                        return (
                          <div
                            className="meal-description-illustration"
                            onClick={() => {
                              console.log(
                                "J'ai cliqué sur le produit =======>",
                                mealOffers
                              );

                              // Mise à jour du panier
                              const newPanier = [...panier];
                              newPanier.push(mealOffers);
                              setPanier(newPanier);
                            }}
                          >
                            <div className="mealOffer">
                              <div className="bloc-description">
                                <h3>{mealOffers.title}</h3>
                                <div className="mealOffer-description">
                                  {mealOffers.description ? (
                                    <span>{mealOffers.description}</span>
                                  ) : (
                                    <span></span>
                                  )}
                                </div>
                                <div className="price-favIcon">
                                  <p>{mealOffers.price} €</p>
                                  {mealOffers.popular === true ? (
                                    <div className="fav-icon">
                                      <i class="fas fa-star"></i>{" "}
                                      <span>Populaire</span>
                                    </div>
                                  ) : (
                                    <span></span>
                                  )}
                                </div>
                              </div>
                            </div>
                            {mealOffers.picture && (
                              <img
                                src={mealOffers.picture}
                                className="meal-illustration"
                                alt="meal-illustration"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="panier">
              {panier.length < 1 ? (
                <>
                  <div className="div-empty-product-button">
                    <button id="empty-product-button">
                      Valider mon panier
                    </button>
                  </div>
                  <div className="panier-vide">
                    <p>Votre panier est vide</p>
                  </div>
                </>
              ) : (
                <div className="div-product-button">
                  <button id="validate-product-button">
                    Valider mon panier
                  </button>
                  <div className="panier-plein">
                    {data.categories.map((mealType, index) => {
                      return (
                        <>
                          {mealType.meals.map((meal, index) => {
                            return (
                              <div className="panier-product-selection">
                                <div className="buttons-product-selection">
                                  <div className="button-circle">
                                    <button
                                      className="minus-button"
                                      // onClick={}
                                    >
                                      -
                                    </button>
                                  </div>
                                  <button class="counter">{counter}</button>
                                  <div className="button-circle">
                                    <button
                                      className="plus-button"
                                      // onClick={}
                                    >
                                      +
                                    </button>
                                  </div>
                                  <p>{meal.title}</p>
                                </div>
                                <div>{meal.price} €</div>
                              </div>
                            );
                          })}
                          ;
                        </>
                      );
                    })}
                    ;
                    <div className="sous-total-bloc-panier">
                      Sous-total & Frais de livraison
                    </div>
                    <div className="total-bloc-panier">Total</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
