import Auth from "../../util/auth";
import AddCartButton from "../../components/UI/AddCartButton";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import ButtonModal from "../../components/UI/ButtonModal";
import { PriceTag } from "./PriceTag";
import { Link as ReactRouterLink } from "react-router-dom";
import { addCartItem, deleteCartItem } from "../../util/cartApi";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";

export const ProductCard = ({ item }) => {
  // // get the current user's cart
  // const [cart, setCart] = useCartContext();

  // // access the current user's id by decoding the jwt in local storage
  // let userId;
  // if (Auth.isLoggedIn()) {
  //   userId = Auth.getPayload().userId;
  //   console.log("userId: ", userId);
  // }

  // // create a set of cartIds to lookup when mapping over items below
  // const cartIds = new Set();
  // cart.forEach((cartItem) => cartIds.add(cartItem.id));

  // // loading state to track while add to cart request is happening and finished
  // const [loading, setLoading] = useState(false);

  // const handleAddCartClick = async (itemId) => {
  //   if (!Auth.isLoggedIn()) return;
  //   setLoading(true);
  //   const updatedItems = await addCartItem(itemId);
  //   setCart(updatedItems);
  //   setLoading(false);
  // };

  // // using imported util function for deleting item
  // const handleCartDelete = async (itemId) => {
  //   const updatedItems = await deleteCartItem(itemId);
  //   setCart(updatedItems);
  // };

  // // rendering a different button under different conditions
  // let button;

  // if (item.sold) {
  //   button = <Text>Sold</Text>; // item is sold, render "sold" button
  // } else if (!Auth.isLoggedIn()) {
  //   // user not logged in, render the modal opening button to tell them to log in
  //   button = (
  //     <ButtonModal buttonContent="Add to Cart">
  //       {" "}
  //       <Text fontSize="lg" align="center">
  //         You must have an account and be logged in to purchase this item
  //       </Text>
  //     </ButtonModal>
  //   );
  // } else if (item.userId === userId) {
  //   button = <Text>My item</Text>; // item belongs to logged in user, render "my item" button
  // } else if (cartIds.has(item.id)) {
  //   button = (
  //     <Button
  //       onClick={() => handleCartDelete(item.id)}
  //       colorScheme="red"
  //       width="full">
  //       Remove from cart
  //     </Button>
  //   ); // item is in cart, return "remove from cart button"
  // } else if (!cartIds.has(item.id)) {
  //   // item is not in cart, return "add to cart button"
  //   button = (
  //     <Button
  //       onClick={() => handleAddCartClick(item.id)}
  //       colorScheme="blue"
  //       width="full">
  //       {loading ? "adding to your cart..." : "Add to cart"}
  //     </Button>
  //   );
  // }

  return (
    <Stack
      spacing={{
        base: "4",
        md: "5",
      }}>
      <Box position="relative">
        <ReactRouterLink to={`/single-item/${item.id}`}>
          <AspectRatio ratio={4 / 3}>
            <Image
              src={item.imagePath}
              alt={item.name}
              opacity={item.sold ? 0.2 : null}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={{
                base: "md",
                md: "xl",
              }}
            />
          </AspectRatio>
        </ReactRouterLink>
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.700", "gray.400")}>
            {item.name}
          </Text>
          <PriceTag price={item.price} currency="USD" />
        </Stack>
        <HStack></HStack>
      </Stack>
      {/* content of button conditionally rendered using logic above */}
      <Stack align="center">
        <AddCartButton item={item} />
      </Stack>
    </Stack>
  );
};
