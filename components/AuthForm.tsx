"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";

import CustomInput from "./CustomInput";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex items-center gap-1 cursor-pointer">
          <Image src="/icons/logo.png" width={34} height={34} alt="NextBank" />
          <h1 className="font-bold text-black-1 text-26 font-ibm-plex-serif">
            NextBank
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="font-semibold text-gray-900 text-24 lg:text-36">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="font-normal text-gray-600 text-16">
              {user
                ? "Link your bank account to continue"
                : type === "sign-in"
                ? "Please enter your details to sign in"
                : "Please enter your details to sign up"}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          {/* TODO: PlaidLin Component */}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Ex: Lagos"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Ex: 100001"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Ex: 123-45-6789"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="font-normal text-gray-600 text-14">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign up here" : "Sign in here"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
