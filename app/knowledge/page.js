"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthStore } from "~/utils/AuthStore";
import UserLayout from "~/components/layout/UserLayout"

import styles from "./knowledge.module.css";
import CategoryItem from "./CategoryItem";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList, faTree } from "@fortawesome/free-solid-svg-icons";
import ObjectItem from "./ObjectItem";
import ObjectList from "./ObjectList";

import {search} from '~/services/object'
import Category from "./Category";

export default function Knowledge() {
  const [showType, setShowType] = useState(1);
  const route = useRouter();
  const { token } = useAuthStore();
  const logOut = () => {
    localStorage.removeItem("jwt");
    setUser(null);

    route.refresh();
  };

  const [objectList, setObjectList] = useState([]);
  const [CateList, setCateList] = useState([]);
  const [rootTree, setRootTree] = useState(null);


  useEffect(() => {
      const fetchData = async () => {
          const res = await search();
          
          if(res.data.length > 0) {
            setObjectList(res.data);
          }
      }

      fetchData();
  }, [])

  useEffect(() => {
      const fetchData = async () => {
          const res = await search({perpage: 4});
          
          if(res.data.length > 0) {
            setCateList(res.data);
          }
      }

      fetchData();
  }, [])

  function setActive1() {
    setShowType(1);
  } 

  function setActive2() {
    setShowType(2);
  } 

  function setActive3() {
    setShowType(3);
  } 

  function handleSetRootTree(id) {
    setRootTree(id);
  }

  

  if (token === null) {
    return (
      <main>
        <UserLayout>
          <div className = {styles.knowledge}>
            <div className = {styles.cate_list}>
              <Category list = {CateList}/>
              <div className = {styles.right}>
                  <div className = {styles.show_type}>
                    
                    <div onClick = {setActive1} className={`${styles.show_type_list} ${showType === 1 && styles.active}`}>
                      <FontAwesomeIcon icon = {faList}/>
                    </div>
                    <div onClick = {setActive2} className={`${styles.show_type_grid} ${showType === 2 && styles.active}`}>
                      <FontAwesomeIcon icon = {faGrip}/>
                    </div>
                    <div onClick = {setActive3} className={`${styles.show_type_tree} ${showType === 3 && styles.active}`}>
                      <FontAwesomeIcon icon = {faTree}/>
                    </div>
                  </div>
                  <Search/>
                  
              </div>
            </div>

            <ObjectList onClick = {handleSetRootTree} showtype = {showType} list = {objectList} root = {rootTree}/>

            
          </div>
        </UserLayout>
      </main>
    );
  }
  return (
    <main>
      <Button className="text-sm" variant="contained" onClick={logOut}>
        Logout
      </Button>
    </main>
  );
}
