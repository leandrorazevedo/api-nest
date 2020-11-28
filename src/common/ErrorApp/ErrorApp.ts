type newErrorAppProps = {
  message: string;
  devMessage?: string;
};

export default function newErrorApp({ message, devMessage }: newErrorAppProps) {
  return {
    success: false,
    message,
    devMessage,
    timeStamp: new Date(),
  };
}
