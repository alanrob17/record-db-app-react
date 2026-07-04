const AboutPage = () => {
  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-8">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h1 className="h3 mb-3">About Record DB</h1>
            <hr />
            <p>
              <strong>Record DB</strong> is a personal music collection browser. It lets you search
              through your collection of artists and their albums, view detailed information about
              each record, and add new records to your collection.
            </p>
            <h5 className="mt-4">Features</h5>
            <ul>
              <li>Search artists by name</li>
              <li>Browse each artist's discography</li>
              <li>View full album details including label, pressing, rating, media type, and review</li>
              <li>Read artist biographies</li>
              <li>Add new records to your collection</li>
            </ul>
            <h5 className="mt-4">Technology</h5>
            <ul>
              <li>React 18 + TypeScript</li>
              <li>React Router v6</li>
              <li>Bootstrap 5</li>
              <li>Vite</li>
              <li>Data stored in browser localStorage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
