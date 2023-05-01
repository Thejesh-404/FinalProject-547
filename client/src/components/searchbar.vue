<template>
    <div class="header-center">
      <div class="search-bar">
        <input type="text" placeholder="Find Items...">
        <button>Search</button>
      </div>
    </div> 
</template>

<style>
    .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    }

    .search-bar input {
    width: 900px;
    flex: 1;
    border: none;
    padding: 10px;
    font-size: 1.2rem;
    font-weight: 300;
    color: #333;
    background-color: transparent;
    }

    .search-bar button {
    margin-left: 50px;
    padding: 10px 20px;
    background-color: rgb(147, 187, 210);
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    }

    .search-bar button:hover {
    background-color: #3e8e41;
    }
</style>
