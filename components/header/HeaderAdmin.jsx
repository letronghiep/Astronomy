"use client";
import { Avatar, Dropdown, Navbar, TextInput } from "flowbite-react";
import Cookies from "js-cookie";
import React from "react";
import { HiSearch } from "react-icons/hi";
import { logout } from "~/services/auth";

function HeaderAdmin() {
  async function signOut() {
    await logout();
    Cookies.remove("jwt");
    localStorage.clear();
    location.reload();
  }
  return (
    <Navbar fluid rounded className="py-3">
      <div className="flex md:order-2 ml-auto">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item href="/admin">Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
        </Dropdown>
      </div>

      <Navbar.Toggle />
    </Navbar>
  );
}

export default HeaderAdmin;
