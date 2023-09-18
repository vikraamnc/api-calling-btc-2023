const apiEP = "https://randomuser.me/api/?results=20";

const countElm = document.getElementById("count");
let userList = [];
const listElm = document.getElementById("list");
const fetchUser = async (url) => {
  try {
    // promise using  fetch to data from any server , fetct()//
    //   const dt = fetch(url);
    //   console.log(dt);
    //   fetch(url)
    //     .then(() => {
    //       console.log(dt);
    //       return dt.json();
    //     })
    //     .then((data) => {
    //       //   console.log(data);
    //       userList = data.results;
    //       //   console.log(userList);
    //       display(userList);
    //     });
    // async ----  await

    const dt = await fetch(url);
    const data = await dt.json();
    userList = data.results;
    display(userList);
  } catch (error) {
    console.log(error);
  }

  //   display(userList);
};

fetchUser(apiEP);

const display = (users) => {
  //   console.log(users);
  let str = "";
  users.map((item, i) => {
    console.log(item);
    str += ` <div class="card flex-grow-1" style="width: 18rem">
    <img
      class="card-img-top"
      src="${item?.picture?.large}" alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${item.name.title}${item.name.first} ${item.name.last}</h5>
      <div class="card text">
        <ul class="list-unstyled">
          <li><i class="fa-solid fa-phone"> &nbsp; </i>${item.phone}</li>
          <li><i class="fa-solid fa-envelope"> &nbsp;</i>${item.email}</li>
          
          <li><i class="fa-solid fa-house"> &nbsp;</i>${item.location.street.number}, ${item.location.city}, ${item.location.state}, ${item.location.country}</li>
        </ul>
      </div>
    </div>
  </div>
    `;
  });
  listElm.innerHTML = str;
  console.log(users.length);
  document.getElementById("count").innerText = users.length;
};

const handleOnGenderSelect = (e) => {
  //   console.log(e);
  const g = e.value;
  const url = `${apiEP}&gender=${g}`;
  fetchUser(url);
};

const func = (e) => {
  //   const { value } = e.target;
  console.log(e.value);
};

document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;
  //   console.log(e.target.value);

  const filteredArg = userList.filter((usr) => {
    const fullName = `${usr.name.first} ${usr.name.last}`.toLowerCase();

    if (fullName.includes(value.toLowerCase())) {
      return true;
    }
  });

  display(filteredArg);
});
