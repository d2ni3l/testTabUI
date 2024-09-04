import { useEffect, useState } from "react";
import "./App.css";
import ShowModal from "./comps/ShowModal";

export interface DataType {
  created_at: string;
  email: string;
  id: number;
  name: string;
  surname: string;
  updated_at: string;
}

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [showModalId, setShowModalId] = useState<number | null>(null);
  const [changedProfile, setChangedProfile] = useState<DataType | null>(null);

  async function getData() {
    const data = await fetch("https://api-test.tabuiapp.it/api/third-test-crud");
    const response = await data.json();
    setData(response);
  }

  useEffect(function () {
    getData();
  }, []);

  useEffect(() => {
    const newData = data.map((obj) =>
      obj.id === changedProfile?.id ? changedProfile : obj
    );
    setData(newData);
  }, [changedProfile]);

  async function deleteProf(profileId: number) {
    fetch(`https://api-test.tabuiapp.it/api/third-test-crud/${profileId}`, {
      method: "DELETE",
    }).then(function () {
      getData();
    });
  }

  // async function getDetails(id: number){
  //   const details = await fetch(`https://api-test.tabuiapp.it/api/third-test-crud/${id}`) nessun informazione aggiuntiva
  //   const response = await details
  //  console.log(response)
  // }

  return (
    <>
      <h1 className='title'>
        <p className='text-red'>Soluzione</p> TabUI Test
      </h1>
      <div className='display'>
        <div className='cards'>
          {data.map((profile) => {
            const profileDate = new Date(profile.updated_at);
            return (
              <div key={profile.id}>
                {showModalId === profile.id && (
                  <ShowModal
                    updated_at={profile.updated_at}
                    created_at={profile.created_at}
                    id={profile.id}
                    setShowModalId={setShowModalId}
                    setChangedProfile={setChangedProfile}
                    name={profile.name}
                    email={profile.email}
                    surname={profile.surname}
                    profileDate={profileDate}
                  />
                )}
                <div className='inner-cards'>
                  <div
                    onClick={() => deleteProf(profile.id)}
                    className='svg-del'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      height='25px'
                      width='18px'
                      version='1.1'
                      id='Layer_1'
                      viewBox='0 0 330 330'
                      xmlSpace='preserve'>
                      <g id='XMLID_6_'>
                        <g id='XMLID_11_'>
                          <path d='M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105    C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75    S266.355,300,225,300z' />
                        </g>
                        <g id='XMLID_18_'>
                          <path d='M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45    H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z' />
                        </g>
                        <g id='XMLID_23_'>
                          <path d='M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0    c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213    c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606    c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225    l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z' />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <p className='col'>
                    <span className='text-red'>Name:</span>{" "}
                    {profile.name[0].toUpperCase() + profile.name.slice(1)}
                  </p>{" "}
                  {/* capitalize string */}
                  <div className='line'></div>
                  <p className='col'>
                    <span className='text-red'>Surname:</span>{" "}
                    {profile.surname[0].toUpperCase() +
                      profile.surname.slice(1)}
                  </p>
                  <div className='line'></div>
                  <p className='col'>
                    <span className='text-red'>Email:</span> {profile.email}
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
                      <p className='text-red'>Updated at:</p>
                      <p className='text '>
                        {profileDate.getDate()}/{profileDate.getMonth() + 1}/
                        {profileDate.getFullYear()}{" "}
                      </p>
                    </div>{" "}
                    <button
                      className='btn z-20 btn-card'
                      onClick={() => {
                        setShowModalId((showModalId) =>
                          showModalId === profile.id ? null : profile.id
                        );
                      }}>
                      {" "}
                      <p className='row-btn text-sm'>
                        <span>Modifica</span>
                        <span style={{ marginTop: "2px" }}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='white'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            width='12px'
                            height='12px'
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
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
