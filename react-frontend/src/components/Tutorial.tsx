import { ChangeEvent, useEffect, useState } from "react";
import ITutorialData from "../model/Tutorial";
import { useNavigate, useParams } from "react-router-dom";
import TutorialService from "../service/TutorialService";

const Tutorial: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };

  const [currentTutorial, setCurrentTutorial] =
    useState<ITutorialData>(initialTutorialState);
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  useEffect(() => {
    if (id) getTutorial(id);
  }, [id]);

  const getTutorial = (id: any) => {
    console.log("id " + id);
    TutorialService.get(id)
      .then((response: any) => {
        console.log(response.data);
        setCurrentTutorial(response.data);
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  const updatePublished = (status: boolean) => {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };
    TutorialService.update(currentTutorial.id, data)
      .then((response: any) => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The status was updated successfully !!!");
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  const updateTutorial = () => {
    TutorialService.update(id, currentTutorial)
      .then((response: any) => {
        setCurrentTutorial(currentTutorial);
        setMessage("The tutorial was updated successfully !!!");
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  const deleteTutorial = () => {
    TutorialService.remove(id)
      .then((response: any) => {
        navigate("/tutorials");
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge bg-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge bg-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge bg-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge bg-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
