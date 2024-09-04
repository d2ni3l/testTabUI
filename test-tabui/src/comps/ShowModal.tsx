import React, { useState } from "react";
import { DataType } from "../App";

interface ShowModalProps {
  name: string;
  email: string;
  surname: string;
  profileDate: Date;
  id: number;
  updated_at: string;
  created_at: string;
  setShowModalId: React.Dispatch<React.SetStateAction<number | null>>;
  setChangedProfile: React.Dispatch<React.SetStateAction<DataType | null>>;
}

export default function ShowModal({
  name,
  email,
  surname,
  profileDate,
  id,
  setChangedProfile,
  setShowModalId,
  updated_at,
  created_at,
}: ShowModalProps) {
  const [update, setUpdate] = useState<boolean>(false);
  const [profileChange, setProfileChange] = useState<DataType>({
    name: name,
    email: email,
    surname: surname,
    id: id,
    updated_at: updated_at,
    created_at: created_at,
  });

  async function updateProfile() {
    const postData = await fetch(
      "https://api-test.tabuiapp.it/api/third-test-crud-update",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(profileChange),
      }
    );

    const response = await postData.json();
    setChangedProfile(response.data);

    setUpdate(false);
  }
  return (
    <div className='modal-wrapper'>
      <div className='modal-inner-wrapper'>
        <div className='modal'>
          <div
            className='x'
            onClick={() => {
              setShowModalId(null);
            }}>
            X
          </div>
          <p className='col'>
            <p className='text-red text-bold text-lg'>Name:</p>
            {!update ? (
              profileChange.name[0].toUpperCase() + profileChange.name.slice(1)
            ) : (
              <div>
                <input
                  className='input'
                  type='text'
                  id='name'
                  onChange={(e) =>
                    setProfileChange({ ...profileChange, name: e.target.value })
                  }
                  defaultValue={name[0].toUpperCase() + name.slice(1)}
                />
              </div>
            )}
          </p>{" "}
          {/* capitalize string */}
          <div className='line'></div>
          <p className='col'>
            <p className='text-red text-bold text-lg'>Surname:</p>{" "}
            {!update ? (
              profileChange.surname[0].toUpperCase() +
              profileChange.surname.slice(1)
            ) : (
              <div>
                <input
                  className='input'
                  id='surname'
                  onChange={(e) =>
                    setProfileChange({
                      ...profileChange,
                      surname: e.target.value,
                    })
                  }
                  type='text'
                  defaultValue={surname[0].toUpperCase() + surname.slice(1)}
                />
              </div>
            )}
          </p>
          <div className='line'></div>
          <p className='col'>
            <p className='text-red text-bold text-lg'>Email:</p>{" "}
            {!update ? (
              profileChange.email
            ) : (
              <div>
                <input
                  className='input'
                  onChange={(e) =>
                    setProfileChange({
                      ...profileChange,
                      email: e.target.value,
                    })
                  }
                  type='text'
                  defaultValue={email}
                />
              </div>
            )}
          </p>
          <div className='line'></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "2px",
            }}>
            <div style={{ display: "flex", gap: "2px" }}>
              <p className='text-red text-bold text-lg'>Updated at:</p>
              <p className='text '>
                {profileDate.getDay()}/{profileDate.getMonth()}/
                {profileDate.getFullYear()}{" "}
              </p>
            </div>
          </div>
          <div className='line'></div>
          <div className='pt-1'></div>
          <div className='row-btn'>
            <button
              className='btn z-20 btn-card'
              onClick={() => {
                setUpdate(!update);
              }}>
              {" "}
              <p className='row-btn text-sm'>
                <span>Modifica</span>
                <span style={{ marginTop: "2px" }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='white'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    width='13px'
                    height='13px'
                    viewBox='0 -0.5 21 21'
                    version='1.1'>
                    <defs></defs>
                    <g
                      id='Page-1'
                      stroke='none'
                      strokeWidth='1'
                      fill='none'
                      fillRule='evenodd'>
                      <g
                        id='Dribbble-Light-Preview'
                        transform='translate(-419.000000, -359.000000)'
                        fill='white'>
                        <g
                          id='icons'
                          transform='translate(56.000000, 160.000000)'>
                          <path
                            d='M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z'
                            id='edit_cover-[#1481]'></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              </p>{" "}
            </button>

            <button className='btn z-20 btn-card' onClick={updateProfile}>
              {" "}
              <p className='row-btn text-sm'>
                <span>Salva modifiche</span>
                <span style={{ marginTop: "4px" }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='white'
                    width='15px'
                    height='15px'
                    viewBox='0 0 24 24'>
                    <path d='M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z' />
                  </svg>
                </span>
              </p>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
