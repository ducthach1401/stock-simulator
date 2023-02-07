export class AuthTokensModel {
  public readonly id: string;
  public readonly userId: string;
  public readonly token: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    token: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.token = token;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      user_id: this.userId,
      token: this.token,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
