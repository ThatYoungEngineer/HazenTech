import { useState } from "react";

import BreadCrumb from "./BreadCrumb";
import SelectionTable from "./SelectionTable";
import { useSidebar } from "../context/sidebarContext";
import OverlaySection from "./OverlaySection";

import { FaSave, FaUserCheck } from "react-icons/fa";
import { HiTrash } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { IoTriangle } from "react-icons/io5";

import { InputSwitch } from "primereact/inputswitch";

import PopperPopupState from "./Popper";

const AbsentResources = () => {
  const { users, selectedUsers, handleSelectUser } = useSidebar();
  const [showAddComment, setShowAddComment] = useState(null);

  const handleRemoveUser = (userId) => {
    handleSelectUser(userId);
  };

  const handleCommentClick = (userId) => {
    setShowAddComment(userId);
  };

  const date = new Date();

  const formattedDate = [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    date.getFullYear(),
  ].join("-");

  return (
    <section className="p-5 w-full">
      <div className="w-full flex items-center justify-between">
        <h2 className="font-Inter-Regular font-light text-xl text-primary">
          Absent/Partial Resources | <span>{formattedDate}</span>
        </h2>
        <BreadCrumb route="Absent Resources" />
      </div>
      <main className="mt-5 w-full bg-white header-shadow rounded-md p-5 flex overflow-y-auto">
        <section className="flex-1 pr-5 border-r border-[#E7E8EA] flex flex-col gap-5">
          <h2 className="w-full text-primary font-Inter-Regular text-lg pb-1 border-b border-[#E8E8E8] ">
            Choose Resources for Absence Marking
          </h2>
          <div className="w-full h-fit ">
            <SelectionTable />
          </div>
        </section>
        <section className="flex-1 pl-5 flex flex-col gap-3">
          <h2 className="w-[99%] flex items-center gap-2 text-primary font-Inter-Regular text-lg pb-1 border-b border-[#E8E8E8] ">
            <FaUserCheck />
            <span>
              Absent/Partial Resources <span>({selectedUsers?.length})</span>
            </span>
          </h2>
          <main className=" w-full h-full flex flex-col justify-between">
            <section className=" flex flex-col gap-3 w-full h-full max-h-[32rem] 2xl:max-h-[39rem] overflow-y-auto overflow-x-hidden relative">
              {selectedUsers && selectedUsers.length > 0 ? (
                users
                  ?.filter((user) => selectedUsers.includes(user.id))
                  .sort(
                    (a, b) =>
                      selectedUsers.indexOf(a.id) - selectedUsers.indexOf(b.id)
                  )
                  .map((user) => (
                    <section
                      key={user.id}
                      className="py-2 px-3 w-[99%] flex items-center justify-between border border-[#00457C] rounded-md"
                    >
                      <div className="flex gap-2 items-center">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR34VNI2RCmMP7q-xSlNft7ya1cNF_HxOZ-xA&s"
                          alt={`Profile picture of ${user.name}`}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <span className="flex flex-col justify-between h-full font-Inter-Medium text-sm text-primary">
                          <h3>{user.name}</h3>
                          <h3>{user.email}</h3>
                        </span>
                      </div>
                      <div className="relative flex items-center gap-2">
                        <h3 className="font-Inter-Regular text-sm text-black">
                          Partially Available
                        </h3>
                        <div className="relative">
                          <InputSwitch
                            checked={user.partiallyAvailable}
                            aria-label={`Toggle availability for ${user.name}`}
                            onClick={() => handleCommentClick(user.id)}
                          />
                          <div
                            className={` ${
                              showAddComment == user.id ? "block" : "hidden"
                            } w-[30vw] absolute top-11 -right-8 z-50`}
                          >
                            <IoTriangle
                              className="translate-x-[21.5rem] 2xl:translate-x-[32rem]"
                              size={20}
                              color="red"
                            />
                            <OverlaySection
                              section="Partial Availability"
                              handleCommentClick={handleCommentClick}
                            />
                          </div>
                        </div>
                        <HiTrash
                          size={25}
                          color="#CB4B6C"
                          cursor={"pointer"}
                          onClick={() => handleRemoveUser(user.id)}
                          title={`Remove ${user.name}`}
                          aria-label={`Remove ${user.name}`}
                        />
                      </div>
                    </section>
                  ))
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <h3 className="font-Inter-Regular text-lg text-gray-500 italic">
                    No resource selected.
                  </h3>
                </div>
              )}
            </section>
            {selectedUsers?.length > 0 && (
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  disabled
                  className="font-Inter-Regular disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-md bg-[#00457C] flex items-center gap-2 p-3 text-white"
                >
                  <FaSave />
                  Save
                </button>
                <button
                  type="button"
                  disabled
                  className="font-Inter-Regular disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-md text-[#00457C] border border-[#00457C] flex items-center gap-1 p-3 bg-transparent"
                >
                  <RxCross2 />
                  Cancel
                </button>
              </div>
            )}
          </main>
        </section>
      </main>
    </section>
  );
};

export default AbsentResources;
