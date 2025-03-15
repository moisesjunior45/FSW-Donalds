"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{ include: { products: true } }>

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoriesWithProducts>(
    restaurant.menuCategories[0],
  );

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white md:p-6 lg:p-7 xl:p-8">
      <div className="p-5">
        <div className="flex items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            height={45}
            width={45}
            className="md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"
          />
          <div>
            <h2 className="text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl">
              {restaurant.name}
            </h2>
            <p className="text-xs opacity-55 md:text-sm lg:text-base xl:text-lg">
              {restaurant.description}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500 md:gap-2 md:text-sm lg:gap-3 lg:text-base xl:gap-4 xl:text-lg">
          <ClockIcon
            size={12}
            className="md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6"
          />
          <p>Aberto!</p>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="px-5 font-semibold pt-8">{selectedCategory.name}</h3>
      <Products products={selectedCategory.products} />
    </div>
  );
};

export default RestaurantCategories;
