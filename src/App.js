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

  const [cart, setCart] = useState([]);

  console.log("Render !");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          "https://deliveroo-panier-app.herokuapp.com/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  let subTotal = 0;

  // à chaque modification d'un état, ce morceau de code est relancé
  cart.forEach((cartItem) => {
    subTotal = subTotal + Number(cartItem.price) * cartItem.quantity;
  });

  let total = subTotal + 2.5;

  const addToCart = (meal) => {
    // push le titre du menu dans cart
    const newCart = [...cart];
    // Est-ce que meal est déjà présent dans cart ?

    const exist = newCart.find((elem) => elem.id === meal.id);
    // console.log("L'élément trouvé ====> ", exist);

    if (exist) {
      // incrémenter exist.quantity

      exist.quantity++;
    } else {
      // ajouter une clé quantity dans meal

      meal.quantity = 1;
      newCart.push(meal);
    }
    setCart(newCart);
  };

  const substractFromCart = (meal) => {
    const newCart = [...cart];
    // On cherche dans newCart l'objet pour lequel on veut décrémenter la quantité

    const exist = newCart.find((elem) => elem.id === meal.id);

    if (exist.quantity === 1) {
      // supprimer l'élément du tableau
      // trouver l'index de l'élément à supprimer
      const index = newCart.indexOf(exist);
      newCart.splice(index, 1);
    } else {
      exist.quantity--;
    }
    setCart(newCart);
  };

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
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
          {/* Liste de catégories */}
          <div className="restaurantOffers-section">
            <div div className="restaurantOffers">
              {data.categories.slice(0, 6).map((category, index) => {
                return (
                  <div className="mealPropositions">
                    <h2 key={index}>{category.name}</h2>
                    <div className="meal-bloc">
                      {category.meals.map((meal, index) => {
                        return (
                          <div
                            className="meal-description-illustration"
                            key={meal.id}
                            onClick={() => {
                              addToCart(meal);
                            }}
                          >
                            <div className="mealOffer">
                              <div className="bloc-description">
                                <h3>{meal.title}</h3>
                                <div className="mealOffer-description">
                                  {meal.description ? (
                                    <span>
                                      {meal.description.slice(0, 50)}...
                                    </span>
                                  ) : (
                                    <span></span>
                                  )}
                                </div>
                                <div className="price-favIcon">
                                  <p>{meal.price} €</p>
                                  {meal.popular && (
                                    <div className="fav-icon">
                                      <i class="fas fa-star"></i>{" "}
                                      <span>Populaire</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {meal.picture && (
                              <img
                                src={meal.picture}
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
              {cart.length < 1 ? (
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
                <div className="panier-plein">
                  {cart.map((elem, index) => {
                    return (
                      <div className="panier-product-selection" key={elem.id}>
                        <div className="buttons-product-selection">
                          <div className="button-circle">
                            <button
                              className="minus-button"
                              onClick={() => substractFromCart(elem)}
                            >
                              -
                            </button>
                          </div>
                          <button class="counter">{elem.quantity}</button>
                          <div className="button-circle">
                            <button
                              className="plus-button"
                              onClick={() => addToCart(elem)}
                            >
                              +
                            </button>
                          </div>
                          <p>{elem.title}</p>
                        </div>
                        <div className="product-price">
                          {(Number(elem.price) * elem.quantity).toFixed(2)} €
                        </div>
                      </div>
                    );
                  })}
                  <div className="total-price-bloc-panier">
                    <div className="sous-total">
                      <span>Sous-total :</span>{" "}
                      <span>{subTotal.toFixed(2)} €</span>
                    </div>
                    <div className="frais-de-livraison">
                      <span>Frais de livraison :</span> <span>2.50 €</span>
                    </div>
                    <div className="total-panier">
                      <span>Total : </span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                    <div className="button-validate-container">
                      <button id="validate-product-button">
                        Valider mon panier
                      </button>
                    </div>
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
