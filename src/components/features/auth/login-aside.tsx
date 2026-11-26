import Image from "next/image";
import { Clock, ShieldCheck, Truck } from "lucide-react";

export function LoginAside() {
  return (
    <div className="hidden lg:block">
      <div className="space-y-6 text-center">
        <Image
          src="/images/auth/login-hero.png"
          alt="Fresh vegetables and fruits shopping cart illustration, modern clean style, green theme"
          width={1024}
          height={1024}
          priority
          sizes="(min-width: 1280px) 616px, (min-width: 1024px) 472px, 0px"
          className="h-96 w-full rounded-2xl object-cover shadow-lg"
        />
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span className="flex items-center">
              <Truck
                className="mr-2 size-4 text-primary-600"
                aria-hidden="true"
              />
              Free Delivery
            </span>
            <span className="flex items-center">
              <ShieldCheck
                className="mr-2 size-4 text-primary-600"
                aria-hidden="true"
              />
              Secure Payment
            </span>
            <span className="flex items-center">
              <Clock
                className="mr-2 size-4 text-primary-600"
                aria-hidden="true"
              />
              24/7 Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
