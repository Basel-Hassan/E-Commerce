import { redirect } from "next/navigation";

type OnlineOrderSuccessPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OnlineOrderSuccessPage({
  searchParams,
}: OnlineOrderSuccessPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) query.append(key, item);
    } else if (value) {
      query.set(key, value);
    }
  }

  const search = query.toString();
  redirect(search ? `/order-success?${search}` : "/order-success");
}
