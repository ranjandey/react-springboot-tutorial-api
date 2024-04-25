import { ChangeEvent, useEffect, useState } from "react";
import ITutorialData from "../model/Tutorial";
import TutorialService from "../service/TutorialService";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TutorialList: React.FC = () => {
  const [tutorials, setTutorials] = useState<Array<ITutorialData>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [activeTutorial, setActiveTutorial] = useState<ITutorialData | null>(
    null
  );
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retreiveTutorials();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const findByTitle = () => {
    TutorialService.findByTitle(searchTitle)
      .then((response: any) => {
        setTutorials(response.data);
        setCurrentIndex(-1);
        setActiveTutorial(null);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  const setCurrentTutorial = (tutorial: ITutorialData, index: number) => {
    setActiveTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  const refreshList = () => {
    retreiveTutorials();
    setCurrentIndex(-1);
    setActiveTutorial(null);
  };

  const retreiveTutorials = () => {
    TutorialService.getAll()
      .then((response: any) => {
        setTutorials(response.data);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setCurrentTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {activeTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {activeTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {activeTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {activeTutorial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tutorial/" + activeTutorial.id}
              className="badge bg-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default TutorialList;
