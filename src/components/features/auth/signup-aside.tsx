import Image from "next/image";
import { ShieldCheck, Star, Truck } from "lucide-react";

const benefits = [
  {
    icon: Star,
    title: "Premium Quality",
    description: "Premium quality products sourced from trusted suppliers.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery available in most areas",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Your data and payments are completely secure",
  },
];

export function SignupAside() {
  return (
    <div>
      <h1 className="text-4xl font-bold">
        Welcome to <span className="text-primary-600">FreshCart</span>
      </h1>
      <p className="text-xl mt-2 mb-4">
        Join thousands of happy customers who enjoy fresh groceries delivered
        right to their doorstep.
      </p>

      <ul className="*:flex *:items-start *:gap-4 space-y-6 my-8">
        {benefits.map(({ icon: Icon, title, description }) => (
          <li key={title}>
            <div className="icon size-12 text-lg bg-primary-200 text-primary-600 rounded-full flex justify-center items-center">
              <Icon aria-hidden="true" />
            </div>
            <div className="content">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="review bg-white shadow-sm p-4 rounded-md">
        <div className="author flex items-center gap-4 mb-4">
          <Image
            src="/images/auth/review-author.png"
            alt="Sarah Johnson"
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
          />
          <div>
            <h3>Sarah Johnson</h3>
            <div className="rating *:text-yellow-300" aria-label="5 stars">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className="size-4 fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
        <blockquote>
          <p className="italic text-gray-600">
            &quot;FreshCart has transformed my shopping experience. The quality
            of the products is outstanding, and the delivery is always on time.
            Highly recommend!&quot;
          </p>
        </blockquote>
      </div>
    </div>
  );
}
