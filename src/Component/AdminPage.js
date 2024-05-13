import React from "react";

export default function AdminPage() {

  

  return (
    <main className="main-container">
      <div className="main-title">
        <h3 id="title-text">DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Total User</h3>
          </div>
          <h1>300</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Post</h3>
          </div>
          <h1>12</h1>
        </div>
      </div>
    </main>
  );
}
