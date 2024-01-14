"use client";
import { Table } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function DataTable({ columns, data, searchComponent }) {
    const router = useRouter();
  return (
    <div className="">
      {searchComponent}
      <div className="max-h-[500px] overflow-auto">
      <Table>
        <Table.Head>
          {columns.map((item) => (
            <Table.HeadCell key={item.idx}>{item.name}</Table.HeadCell>
          ))}
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y h-[300px] max-h-[300px] overflow-hidden">
          {data?.map((item) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={item.id}
            >
              {columns.map((column) => (
                <Table.Cell
                  key={column.id}
                  className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                >
                  {/* {column.selector === "image" ? (
                    <Image src={`${column.selector}`} width={30} height={50} />
                  ) : (
                    item[column.selector]
                  )} */}
                  {item[column.selector]}
                </Table.Cell>
              ))}
              <Table.Cell>
                <button
                  onClick={() =>
                    router.push(
                      `/admin/article-category/update-category/${item._id}`
                    )
                  }
                  className=" w-20 py-1 mx-2 text-xs text-green-600 hover:text-white hover:bg-green-600 border border-green-600 rounded transition-all duration-700"
                >
                  Update
                </button>
                <button className=" w-20 py-1 mx-2 text-xs text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded transition-all duration-700">
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      </div>
    </div>
  );
}

export default DataTable;
