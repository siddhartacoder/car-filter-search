/**
 * Initial setup for rendering the car list.
 * At this stage, all cars are displayed without any filters applied.
 **/

// Container for the rendered cars.
const resultado = document.querySelector("#resultado");

// Form filter selectors
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

// Define year range for filtering (last 10 years in descending order)
const max = new Date().getFullYear();
const min = max - 10;

// Object that stores the current filter values selected by the user
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); // Display all cars initially
  llenarSelect(); // Populate year dropdown
});

// Updates search criteria whenever a filter value changes
marca.addEventListener("input", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener("input", (e) => {
  datosBusqueda.year = Number(e.target.value);
  filtrarAuto();
});

minimo.addEventListener("input", (e) => {
  datosBusqueda.minimo = Number(e.target.value);
  filtrarAuto();
});

maximo.addEventListener("input", (e) => {
  datosBusqueda.maximo = Number(e.target.value);
  filtrarAuto();
});

puertas.addEventListener("input", (e) => {
  datosBusqueda.puertas = Number(e.target.value);
  filtrarAuto();
});

transmision.addEventListener("input", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener("input", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

// Renders the full list of cars on the resultado section
function mostrarAutos(autos) {
  limpiarHTML();
  autos.forEach((auto) => {
    // Extract relevant properties from each car object
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;

    // Create HTML element for each car
    const autoHTML = document.createElement("P");
    autoHTML.textContent = `${marca} ${modelo} - Año: ${year} - Precio: ${precio} - Puertas: ${puertas} - Color: ${color} - Transmision: ${transmision}`;

    resultado.appendChild(autoHTML);
  });
}

// Removes all child elements from the results container
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// Populates year dropdown with last 10 years in descending order
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

// Applies active filters to the cars list based on selected criteria
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

// Displays error message when no cars match the selected criteria
function noResultado() {
  limpiarHTML();
  const divNoResultado = document.createElement("div");
  divNoResultado.classList.add("alerta" , "error");
  divNoResultado.textContent = "No se encontraron vehiculos con esos criterios.";
  resultado.appendChild(divNoResultado);
}

// Filters cars by brand if a brand has been selected
function filtrarMarca(auto) {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  } else {
    return auto;
  }
}

// Filters cars by year if one has been selected
function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  } else {
    return auto;
  }
}

// Filters cars by min price and if the price has been selected
function filtrarMinimo(auto) {
  if (datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  } else {
    return auto;
  }
}

// Filters cars by max price and if the price has been selected
function filtrarMaximo(auto) {
  if (datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo;
  } else {
    return auto;
  }
}

// Filters cars by number of doors if selected
function filtrarPuertas(auto) {
  if (datosBusqueda.puertas) {
    return auto.puertas === datosBusqueda.puertas;
  } else {
    return auto;
  }
}

// Filters cars by transmission type if selected
function filtrarTransmision(auto) {
  if (datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision;
  } else {
    return auto;
  }
}

// Filters cars by color that has been selected
function filtrarColor(auto) {
  if (datosBusqueda.color) {
    return auto.color === datosBusqueda.color;
  } else {
    return auto;
  }
}
